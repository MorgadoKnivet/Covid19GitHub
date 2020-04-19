const Crypto = require('crypto');

const Algorithm = 'aes-192-cbc';

module.exports.criptography = async (string, salt) => {
  const cipher = Crypto.createCipheriv(
    Algorithm,
    Crypto.scryptSync('YvSR6CXx1ewkkBpCl5Oigi48Z597mbVa', salt, 24),
    Buffer.alloc(16, 0)
  );

  let cipheredString = cipher.update(string, 'utf8', 'hex');
  cipheredString += cipher.final('hex');

  return cipheredString;
};

module.exports.generateSalt = async () => {
  return `${+new Date()}${Math.random().toString()}`;
};
