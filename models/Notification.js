const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const NotificationSchema = new Schema({
  deviceToken: {
    unique: true,
    type: String,
    required: [true, 'Device Token is required'],
  },
});
NotificationSchema.plugin(uniqueValidator, {
  message: '{PATH} must be a unique value',
});
NotificationSchema.methods.toJSON = function () {
  const { __v, ...notification } = this.toObject();
  return notification;
};
module.exports = mongoose.model('notification', NotificationSchema);
