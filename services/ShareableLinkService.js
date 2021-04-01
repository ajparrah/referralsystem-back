const ShareableLink = require('../models/ShareableLink');

class ShareableLinkService {
  async create(newShareableLink) {
    return await ShareableLink(newShareableLink).save();
  }

  async getAll() {
    return await ShareableLink.find();
  }

  async getByName(name) {
    return await ShareableLink.findOne({
      name,
    });
  }

}
module.exports = ShareableLinkService;
