const bcrypt = require('bcrypt');

const userSignUpSerializer = (user) => {
  const userToAdd = {
    name: user.name.trim(),
    email: user.email.trim(),
    password: bcrypt.hashSync(user.password, 10),
    role: user.role,
  };
  return userToAdd;
};

const shareableLinkSerializer = (sharableLink, name, userId) => {
  const sharableLinkToAdd = {
    name,
    url: sharableLink,
    createdBy: userId,
  };
  return sharableLinkToAdd;
}

module.exports = {
  userSignUpSerializer,
  shareableLinkSerializer
};
