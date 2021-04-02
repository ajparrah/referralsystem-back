const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ShareableLinkSchema = new Schema({
  name: {
    unique: true,
    type: String,
    required: [true, 'Name is required'],
  },
  url: {
    unique: true,
    type: String,
    required: [true, 'Url is required'],
  },
});
ShareableLinkSchema.plugin(uniqueValidator, {
  message: '{PATH} must be a unique value',
});
ShareableLinkSchema.methods.toJSON = function () {
  const { __v, ...shareableLink } = this.toObject();
  return shareableLink;
};
module.exports = mongoose.model('shareableLink', ShareableLinkSchema);
