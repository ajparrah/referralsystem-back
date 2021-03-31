const { userSignUpValidator } = require('../../helpers/validate');

const userSignUpMiddlewares = (req, res, next) => {
  const resultValidation = userSignUpValidator(req.body);
  if(resultValidation){
    return res.status(400).json({
      ok: false,
      msg: 'Something wents wrong to sign up',
      error: resultValidation,
    });
  }
  next();
};

module.exports = {
  userSignUpMiddlewares,
}
