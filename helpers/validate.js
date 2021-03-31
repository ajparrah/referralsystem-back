const validator = require('validator').default;
const bcrypt = require('bcrypt');

const userSignUpValidator = (user) => {
  const { password, email } = user;
  if(validator.isEmpty(password.trim())) return 'Password is required';

  if(!validator.isLength(password.trim(), {
    min: 6
  })) return 'Password must be at least 6 characters';

  if(!validator.isEmail(email.trim())) return 'Email is not valid email address';
  return null;
};

const userLoginValidator = (user) => {
  const { password, email } = user;

  if(validator.isEmpty(email.trim())) return 'Email can not be empty. Please, make sure fill it out';

  if(!validator.isEmail(email.trim())) return 'Email is not valid email address';

  if(validator.isEmpty(password.trim())) return 'Password can not be empty. Please, make sure fill it out';

  return null;
};

const userLoginValidatePassword = (passwordToValidate, passwordDB) => {
  let result = false;
  if(bcrypt.compareSync(passwordToValidate, passwordDB)) {
    result = true;
  }
  return result;
}

module.exports ={
  userSignUpValidator,
  userLoginValidator,
  userLoginValidatePassword,
}
