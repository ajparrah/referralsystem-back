const validator = require('validator').default;

const userSignUpValidator = (user) => {
  const { password, email } = user;
  if(validator.isEmpty(password.trim())) return 'Password is required';

  if(!validator.isLength(password.trim(), {
    min: 6
  })) return 'Password must be at least 6 characters';

  if(!validator.isEmail(email.trim())) return 'Email is not valid email address';
  return null;
};

module.exports ={
  userSignUpValidator,
}
