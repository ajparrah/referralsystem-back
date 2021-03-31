const { userSignUpValidator, userLoginValidator } = require('../../helpers/validate');

const userSignUpMiddlewares = (req, res, next) => {
  const validationFailed = userSignUpValidator(req.body);
  if(validationFailed){
    return res.status(400).json({
      ok: false,
      msg: 'Something wents wrong to sign up',
      error: validationFailed,
    });
  }
  next();
};

const userLoginMiddlewares = (req, res, next) => {
  const validationFailed = userLoginValidator(req.body);
  if(validationFailed){
    return res.status(400).json({
      ok: false,
      msg: 'Something wents wrong to sign in',
      error: validationFailed,
    });
  }
  next();
};

module.exports = {
  userSignUpMiddlewares,
  userLoginMiddlewares,
}
