const Jwt = require('jsonwebtoken');

module.exports.generateToken = async (data, expiresIn, type) => {
  return Jwt.sign(
    {
      type,
      data
    },
    'THmFeWoQ5FGjcdddOLxy6tjKujjaGxH4',
    {
      algorithm: 'HS512',
      expiresIn
    }
  );
};

module.exports.verifyToken = async token => {
  return Jwt.verify(token, 'THmFeWoQ5FGjcdddOLxy6tjKujjaGxH4');
};
