const express = require('express');
const { userSignUpSerializer } = require('../helpers/serializers');
const UserService = require('../services/UserService');
const { userSignUpMiddlewares } = require('./middlewares/userMiddlewares');

const router = express.Router();
const service = new UserService();

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

// router.post('/login', async (req, res) => {
//   try {
//     userLogin
//   } catch (error) {
//     console.log('Error at login', error);
//     return res.status(400).json({
//       ok: false,
//       msg: 'Something wents wrong to sign in',
//       error: error.message,
//     });
//   }
// });

module.exports = router;
