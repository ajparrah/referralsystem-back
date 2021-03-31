const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const rolesValid = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} is not valid',
};

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    unique: true,
    type: String,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Passwors is required'],
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: rolesValid,
  },
});
UserSchema.methods.toJSON = function () {
  const { password, __v, ...userWithoutPassword } = this.toObject();
  return userWithoutPassword;
};
UserSchema.plugin(uniqueValidator, {
  message: '{PATH} must be a unique value',
});
module.exports = mongoose.model('user', UserSchema);
