const CriptographyClass = require('./cryptography');

module.exports.criptographyWithNewSalt = async string => {
  const salt = await CriptographyClass.generateSalt();
  const cipheredString = await CriptographyClass.criptography(string, salt);

  return {
    salt,
    cipheredString
  };
};

module.exports.criptographyWithSalt = async (string, salt) => {
  const cipheredString = await CriptographyClass.criptography(string, salt);

  return {
    salt,
    cipheredString
  };
};
