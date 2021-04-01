const { userIsAdmin } = require('../../helpers/validate');
const jwt = require('jsonwebtoken');

const createLinkMiddlewares = (req, res, next) => {
  const { token } = req.headers;
  const { user } = jwt.decode(token, {
    json: true,
  });
  const userCanCreateLink = userIsAdmin(user);
  if (!userCanCreateLink) {
    return res.status(400).json({
      ok: false,
      msg: 'Something wents wrong to sign in',
      error: 'User does not have the necessary permissions',
    });
  }
  req.userId = user._id;
  next();
};

module.exports = {
  createLinkMiddlewares,
};
