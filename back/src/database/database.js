global.__mongoose = require('mongoose');

const { Schema, model } = global.__mongoose;

const modelsCreated = {};




const connectMongoDB = async () => {
  await global.__mongoose.connect(`mongodb+srv://admin:KIAn16VSgHSbaYEo@swcovid19-rg0wq.gcp.mongodb.net/stage-live?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};
module.exports.connectMongoDB = connectMongoDB;

const findModel = modelName => {
  return modelsCreated[modelName];
};
module.exports.findModel = findModel;

const generateId = () => {
  return global.__mongoose.Types.ObjectId();
};
module.exports.generateId = generateId;

const modelExistException = modelName => {
  const ModelObject = findModel(modelName);
  if (ModelObject !== undefined) {
    global.__logger.error(`Database Model já existe - Model name: ${modelName}`);
    throw new Error(
      JSON.stringify({
        code: 500,
        msg: `Database Model já existe - Model name: ${modelName}`
      })
    );
  }
  return ModelObject;
};

const modelNotExistException = modelName => {
  const ModelObject = findModel(modelName);
  if (ModelObject === undefined) {
    global.__logger.error(`Database Model não existe - Model name: ${modelName}`);
    throw new Error(
      JSON.stringify({
        code: 500,
        msg: `Database Model não existe - Model name: ${modelName}`
      })
    );
  }
  return ModelObject;
};

module.exports.createModel = async (modelName, schemaObject) => {
  modelExistException(modelName);

  modelsCreated[modelName] = model(modelName, new Schema(schemaObject));
  return modelsCreated[modelName];
};

module.exports.newModelInstance = async (modelName, instanceObject) => {
  const ModelObject = modelNotExistException(modelName);

  const modelInstantiated = new ModelObject(instanceObject);
  return modelInstantiated;
};

module.exports.saveNewModelInstance = async instanceObject => {
  const saveModelResponse = await instanceObject.save();
  return saveModelResponse;
};

module.exports.findModelInstance = async (modelName, query) => {
  const ModelObject = modelNotExistException(modelName);

  const findModelResponse = await ModelObject.find(query);
  return findModelResponse;
};

module.exports.findByIdModelInstance = async (modelName, id) => {
  const ModelObject = modelNotExistException(modelName);

  const findByIdModelResponse = await ModelObject.findById(id);
  return findByIdModelResponse;
};
