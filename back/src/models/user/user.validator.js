const validEmailString = email => {
  return (
    typeof email === 'string' && new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/).test(email)
  );
};

const validPasswordString = password => {
  return typeof password === 'string' && password.trim().length >= 6;
};

const validNewUserBeforeRegister = ({
  email,
  password,
  username,
  birthday,
  sex,
  favoritBand
}) => {
  const validator =
    (typeof username === 'string') &&
    typeof birthday === 'string' &&
    typeof favoritBand === 'string' &&
    validEmailString(email) &&
    validPasswordString(password) 
    //&& (sex === 'M' || sex === 'F' || sex === 'O')
  return validator;
};

const validateTicket = ({
  showId,
  whenPurchased
}) => {
  const validator =
    (typeof showId === 'string') &&
    (typeof whenPurchased === 'string' )


  return validator;
};


module.exports.validateTicket = validateTicket
module.exports.validEmailString = validEmailString;
module.exports.validPasswordString = validPasswordString;
module.exports.validNewUserBeforeRegister = validNewUserBeforeRegister;
