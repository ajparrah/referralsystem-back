const express = require('express');
const { userSignUpSerializer } = require('../helpers/serializers');
const UserService = require('../services/UserService');
const {
  userSignUpMiddlewares,
  userLoginMiddlewares,
} = require('./middlewares/userMiddlewares');
const { userLoginValidatePassword } = require('../helpers/validate');
const jwt = require('jsonwebtoken');

const router = express.Router();
const service = new UserService();
const secretSeed = 'reachyetitest'; // this is really bad...

router.get('/', (req, res) => {
  res.status(200).json({
    key: 'hello',
  });
});

router.post('/signup', userSignUpMiddlewares, async (req, res) => {
  try {
    const userToAdd = userSignUpSerializer(req.body);
    const result = await service.signUp(userToAdd);
    return res.status(200).json({
      ok: true,
      msg: 'User created successfully',
      user: result,
    });
  } catch (error) {
    console.log('Error at signUp', error);
    return res.status(400).json({
      ok: false,
      msg: 'Something wents wrong to sign up',
      error: error.message,
    });
  }
});

router.post('/login', userLoginMiddlewares, async (req, res) => {
  try {
    const userExist = await service.getUserByEmail(req.body.email);
    if (userExist) {
      const passwordValid = userLoginValidatePassword(
        req.body.password,
        userExist.password
      );

      if (!passwordValid) throw Error('Credentials not valid');
      
      const payload = { user: userExist };
      const tokenGenerated = jwt.sign(payload, secretSeed, {
        expiresIn: '12h',
      });
      return res.status(200).json({
        ok: true,
        msg: 'User Logged Successfully',
        user: userExist,
        token: tokenGenerated,
      });
    } else {
      throw Error('Credentials not valid');
    }
  } catch (error) {
    console.log('Error at login', error);
    return res.status(400).json({
      ok: false,
      msg: 'Something wents wrong to sign in',
      error: error.message,
    });
  }
});

module.exports = router;
