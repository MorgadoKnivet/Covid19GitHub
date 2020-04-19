const UserModel = require('./user.model');
const UserValidator = require('./user.validator');
const ConcertClass = require('../concert/concert')
const ConcertModel = require('../concert/concert.model')
const CryptographyInterface = require('./../cryptography/cryptography.interface');
const DatabaseInterface = require('../../database/database.interface');
const AuthentitcationInterface = require('../authentication/authentication.interface');

const emailAlreadyRegistred = async email => {
  const usersWithThisEmail = await DatabaseInterface.findModelInstance(UserModel.modelDatabaseName, {
    email
  });

  if (usersWithThisEmail !== null && usersWithThisEmail.length > 0) {
    return true;
  }
  return false;
};
module.exports.emailAlreadyRegistred = emailAlreadyRegistred;

const validNewUserClean = async ({
  email,
  password,
  username,
  birthday,
  sex,
  favoritBand
}) => {
  const userIsValid = UserValidator.validNewUserBeforeRegister({
    email,
    password,
    username,
    birthday,
    sex,
    favoritBand
  });

  if (!userIsValid) {
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
module.exports.validNewUserClean = validNewUserClean;

const validateTicket = async ({
  showId,
  whenPurchased
}) => {
  const ticketIsValid = UserValidator.validateTicket({
    showId,
    whenPurchased
  });

  if (!ticketIsValid) {
    throw new Error(
      JSON.stringify({
        code: 400,
        msg: 'Dados inválidos ou faltantes'
      })
    );
  }
}


module.exports.validateTicket = validateTicket

const registerUser = async ({
  email,
  password,
  username,
  birthday,
  sex,
  favoritBand
}) => {
  const {salt, cipheredString} = await CryptographyInterface.criptographyWithNewSalt(password);
  const profilePictureUrl = null;
  
  const userModel = await DatabaseInterface.newModelInstance(UserModel.modelDatabaseName, {
    email,
    password: cipheredString,
    username,
    birthday,
    sex:"",
    salt,
    favoritBand,
    profilePictureUrl,
    purchasedTickets: []
  });

  const userCreated = await DatabaseInterface.saveNewModelInstance(userModel);
  return userCreated;
};
module.exports.registerUser = registerUser;

const retrieveUserByEmail = async email => {
  const usersWithThisEmail = await DatabaseInterface.findModelInstance(UserModel.modelDatabaseName, {
    email
  });

  return usersWithThisEmail;
};
module.exports.retrieveUserByEmail = retrieveUserByEmail;

const retrieveUserById = async id => {
  const userWithThisId = await DatabaseInterface.findByIdModelInstance(
    UserModel.modelDatabaseName,
    id
  );

  console.log(userWithThisId);

  return userWithThisId;
};
module.exports.retrieveUserById = retrieveUserById;

const verifyPasswordMatch = async (id, password) => {
  const userWithId = await retrieveUserById(id);

  // Criptografar senha
  const { cipheredString } = await CryptographyInterface.criptographyWithSalt(
    password,
    userWithId.salt
  );

  if (cipheredString === userWithId.password) {
    return true;
  }
  return false;
};
module.exports.verifyPasswordMatch = verifyPasswordMatch;

const generateAuthTokensById = async id => {
  const userWithId = await retrieveUserById(id);

  // Gerar tokens
  const token = await AuthentitcationInterface.generateToken({
    id: userWithId._id,
    teamId: userWithId.teamId
  });

  const refreshToken = await AuthentitcationInterface.generateRefreshToken({
    id: userWithId._id,
    teamId: userWithId.teamId
  });

  return {
    token,
    refreshToken
  };
};
module.exports.generateAuthTokensById = generateAuthTokensById;

const setFollowsBands = async ({bandId,userId}) => {
  try {
    
    const userWithThisId = await DatabaseInterface.findByIdModelInstance(
      UserModel.modelDatabaseName,
      userId
    );

    if (userWithThisId.followsBands != undefined) {
      if( userWithThisId.followsBands.filter(band => band.bandId === bandId).length != 0 )
        return userWithThisId
      else{
          
        let followsBands = userWithThisId.followsBands

        followsBands.push({
          bandId
        })

        userWithThisId.followsBands = followsBands
        
        if (userWithThisId.followersNumber == undefined) {
          userWithThisId.followersNumber = 1
        }else{
          userWithThisId.followersNumber += 1
        }
        
        return userWithThisId.save()
      }  
    }else{
      userWithThisId.followsBands = [{
        bandId
      }] 

      userWithThisId.followersNumber = true
      return userWithThisId.save()
    }
   
    
  } catch (error) {
      throw error
  }
 
}
module.exports.setFollowsBands = setFollowsBands;

const removeFollowsBands = async ({bandId,userId}) => {

  try{

    const userWithThisId = await DatabaseInterface.findByIdModelInstance(
      UserModel.modelDatabaseName,
      userId
    );

    
    if ( userWithThisId.followsBands != undefined) {

      if( userWithThisId.followsBands.filter(user => user !== null ? user.bandId === bandId : false).length == 0 ){


        return userWithThisId

      }else{
          
        let newArrayFollows = userWithThisId.followsBands.filter(user => user !== null ? user.bandId !== bandId : false)
         
        userWithThisId.followsBands = newArrayFollows
        userWithThisId.followersNumber -= 1

        
        return userWithThisId.save()
      }  
    }else{

      userWithThisId.followersNumber = 0

      return userWithThisId.save()
    }
    
  
  } catch (error) {
      throw error
  }

}

module.exports.removeFollowsBands = removeFollowsBands

const addPurchasedTicket = async ({showId,whenPurchased,userId}) => {

 

    const userWithThisId = await DatabaseInterface.findByIdModelInstance(
      UserModel.modelDatabaseName,
      userId
    );

    if ( userWithThisId.purchasedTickets.filter(item => item.showId == showId).length == 0 ){
      // verificar se um concerto existe

      const concertById = await DatabaseInterface.findByIdModelInstance(
        ConcertModel.modelDatabaseName,
        showId
      )

      if (concertById != null ) {
        userWithThisId.purchasedTickets.push({
          showId,
          whenPurchased
        })

        concertById.ticketsSold += 1
        concertById.save()

        return userWithThisId.save()

      }else{
        throw new Error(
          JSON.stringify({
            code: 400,
            msg: 'ConcertId não existe'
          })
        );
    
      }


    }else{
      return userWithThisId
    }
    
   

}

module.exports.addPurchasedTicket = addPurchasedTicket
