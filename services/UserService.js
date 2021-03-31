const User = require('../models/User');

class UserService {
  async signUp(newUser) {
    return await User(newUser).save();
  }

  async getUserByEmail(userEmail) {
    return await User.findOne({
      email: userEmail,
    }); // Return null if user doesn't exist
  }

}
module.exports = UserService;