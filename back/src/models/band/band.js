const BandModel = require('./band.model');
const BandValidator = require('./band.validator');
const ConcertModel = require('../../models/concert/concert.model');
const UserClass = require('./../user/user')

const AuthentitcationInterface = require('../authentication/authentication.interface');
const DatabaseInterface = require('../../database/database.interface');
const CryptographyInterface = require('./../cryptography/cryptography.interface');

const emailAlreadyRegistred = async email => {
  const bandWithThisEmail = await DatabaseInterface.findModelInstance(BandModel.modelDatabaseName, {
    email
  });

  if (bandWithThisEmail !== null && bandWithThisEmail.length > 0) {
    return true;
  }
  return false;
};
module.exports.emailAlreadyRegistred = emailAlreadyRegistred;

const validNewCleanBand = async ({
  email,
  password, 
  foundationDate,
  name,
  segment
}) => {
  const bandIsValid = BandValidator.validNewBandBeforeRegister({
    email,
    password, 
    foundationDate,
    name,
    segment
  });

  if (!bandIsValid) {

    throw new Error(
      JSON.stringify({
        code: 400,
        msg: 'Dados inválidos ou faltantes'
      })
    );

  }

  // Verificar se email ja está cadastrado
  const emailIsAlreadyRegistred = await emailAlreadyRegistred(email);
  if (emailIsAlreadyRegistred) {
    throw new Error(
      JSON.stringify({
        code: 409,
        msg: 'Já existe um usuário com esse email'
      })
    );
  }

  return true;
};
module.exports.validNewCleanBand = validNewCleanBand;

const registerBand = async ({
  email,
  password, 
  foundationDate,
  name,
  segment
}) => {
    const {salt, cipheredString} = await CryptographyInterface.criptographyWithNewSalt(password);

    const bandModel = await DatabaseInterface.newModelInstance(BandModel.modelDatabaseName, {
      email,
      password: cipheredString,
      salt: salt,
      details: {
          biography: '',
          photo: null,
          logo: null,
          name,
          foundationDate,
          segment
      },
      location: {
          city: '',
          state:'',
          country: '',
      },
      members: [],
      followersNumber: 0,
      followersList: []
    });
  
    return await DatabaseInterface.saveNewModelInstance(bandModel);
    
};
module.exports.registerBand = registerBand;

const getBand = async ({bandId}) => {
 
  return await DatabaseInterface.findByIdModelInstance(
    BandModel.modelDatabaseName,
    bandId
  );

}
module.exports.getBand = getBand;

const getBands = async () => {
 
  return await DatabaseInterface.findModelInstance(
    BandModel.modelDatabaseName,
  );

}
module.exports.getBands = getBands;

const updateBand = async ({bandId, details, location, members}) => {

  try {
    let response = await getBand({bandId})
      
    console.log(response)

    response.details = details
    response.location = location
    response.members = members

    response.save()

    return response

  } catch (error) {
    throw error
  }

}
module.exports.updateBand = updateBand;

const updateBandDetaills = async ({bandId,details}) => {
  
  BandValidator.validNewBandBeforeRegister(details)

  try {
    let response = await getBand({bandId})
      
    response.details = details

    return response.save()

  } catch (error) {
    throw error
  }


}

module.exports.updateBandDetaills = updateBandDetaills;

const retrieveBandById = async id => {
  const bandWithThisId = await DatabaseInterface.findByIdModelInstance(
    BandModel.modelDatabaseName,
    id
  );

  return bandWithThisId;
};

const setFollow = async ({bandId,userId}) => {

  try { 

    let response = await getBand({bandId})

    if (response.followers != undefined) {

      if( response.followers.filter(banda => banda.userId === userId).length != 0 ){
        return response
      }else{
        response.followers.push({
          userId
        })

        if (response.followersNumber < 0) {
          response.followersNumber = 1
        }else{
          response.followersNumber += 1
        }

        return response.save()
      }

    }else{
      response.followers = [{
        userId
      }]

      response.followersNumber = 1

      return response.save()
    }

  } catch (error) {
    throw error
  }
  
}

module.exports.retrieveBandById = retrieveBandById;


const removeFollow = async ({bandId,userId}) => {

  try { 

    let response = await getBand({bandId})

    if (response.followers != undefined) {
      
      if( response.followers.filter(banda => banda.userId === userId).length == 0 ){

        if (response.followersNumber != undefined) {
          if (response.followersNumber < 0) {
            response.followersNumber = 0
          }else{
            response.followersNumber -= 1
          }
          
        }
        return response.save()

      
      }else{
            
        let newArrayFollows = response.followers.filter(band => band !== null ? band.userId !== userId : false)

        response.followers = newArrayFollows

         
        if (response.followersNumber != undefined) {
          if (response.followersNumber < 0) {
            response.followersNumber = 0
          }else{
            response.followersNumber -= 1
          }
          
        }
        return response.save()

      }

    }else{
      return response
    }

  } catch (error) {
    throw error
  }
  //setFollow
}


const retrieveBandByEmail = async email => {
  const bandWithThisEmail = await DatabaseInterface.findModelInstance(BandModel.modelDatabaseName, {
    email
  });

  return bandWithThisEmail;
};
module.exports.retrieveBandByEmail = retrieveBandByEmail;

const verifyPasswordMatch = async (id, password) => {
  const bandWithId = await retrieveBandById(id);

  // Criptografar senha
  const { cipheredString } = await CryptographyInterface.criptographyWithSalt(
    password,
    bandWithId.salt
  );

  if (cipheredString === bandWithId.password) {
    return true;
  }
  return false;
};

module.exports.verifyPasswordMatch = verifyPasswordMatch;

const generateAuthTokensById = async id => {
  const bandWithId = await retrieveBandById(id);

  // Gerar tokens
  const token = await AuthentitcationInterface.generateToken({
    id: bandWithId._id,
    teamId: bandWithId.teamId
  });

  const refreshToken = await AuthentitcationInterface.generateRefreshToken({
    id: bandWithId._id,
    teamId: bandWithId.teamId
  });

  return {
    token,
    refreshToken
  };
};
module.exports.generateAuthTokensById = generateAuthTokensById;

const getConcertsByBand = async ({bandId}) => {

  let band = await getBand({bandId})

  if (band == null) {
    throw "Banda não existe"
  }

  const concertsByBand = await DatabaseInterface.findModelInstance(ConcertModel.modelDatabaseName, {
    bandId
  });

  return concertsByBand

}

module.exports.getConcertsByBand = getConcertsByBand


const updatePhotoBand = async ({bandId,photo}) => {
   
    let badById = await getBand({bandId})

    badById.details.photo = photo

    return badById.save()

    
}

module.exports.updatePhotoBand = updatePhotoBand

const updateLogoBand = async ({bandId,logo}) => {
   
  let badById = await getBand({bandId})

  badById.details.logo = logo

  return badById.save()

  
}

module.exports.updateLogoBand = updateLogoBand


const deletePhotoBand = async ({bandId}) => {
   
  let badById = await getBand({bandId})

  badById.details.photo = ""

  return badById.save()

  
}

module.exports.deletePhotoBand = deletePhotoBand


const deleteLogoBand = async ({bandId}) => {
   
  let badById = await getBand({bandId})

  badById.details.logo = ""

  return badById.save()

  
}

module.exports.deleteLogoBand = deleteLogoBand





module.exports.registerBand = registerBand;
module.exports.getBand = getBand;
module.exports.getBands = getBands
module.exports.updateBand = updateBand
module.exports.setFollow = setFollow
module.exports.removeFollow = removeFollow
//module.exports.generateAuthTokensById = generateAuthTokensById;
