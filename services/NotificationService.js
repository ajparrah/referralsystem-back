const Notification = require('../models/Notification');

class NotificationService {
  async saveDeviceToken(deviceToken) {
    return await Notification(deviceToken).save();
  }

  async getAllDevices() {
    return await Notification.find();
  }

}
module.exports = NotificationService;
