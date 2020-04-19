const DatabaseClass = require('./database');

module.exports.connectDatabase = () => {
  DatabaseClass.connectMongoDB();
};

module.exports.createModel = async (modelName, schemaObject) => {
  return DatabaseClass.createModel(modelName, schemaObject);
};

module.exports.newModelInstance = async (modelName, instanceObject) => {
  return DatabaseClass.newModelInstance(modelName, instanceObject);
};

module.exports.saveNewModelInstance = async instanceObject => {
  const saveModelResponse = await DatabaseClass.saveNewModelInstance(instanceObject);
  return saveModelResponse;
};

module.exports.findModelInstance = async (modelName, query) => {
  const findModelResponse = await DatabaseClass.findModelInstance(modelName, query);
  return findModelResponse;
};

module.exports.findByIdModelInstance = async (modelName, id) => {
  const findByIdModelResponse = await DatabaseClass.findByIdModelInstance(modelName, id);
  return findByIdModelResponse;
};

module.exports.generateId = () => {
  return DatabaseClass.generateId();
};
