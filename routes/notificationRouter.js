const express = require('express');
const { firebaseAdmin } = require('../helpers/configFirebase');
const NotificationService = require('../services/NotificationService');
const router = express.Router();
const service = new NotificationService();

router.post('/send/:name', async (req, res) => {
  try {
    const { name } = req.params;
    if (name) {
      const devices = await service.getAllDevices();
      const devicesToSendNotification = devices.map((device) => device.deviceToken);
      if (devices.length > 0) {
        const bodyMessage = `Notification from ${name}`;
        const result = await firebaseAdmin
          .getInstance()
          .messaging()
          .sendMulticast({
            tokens: devicesToSendNotification,
            notification: {
              title: 'Reachyetiapp',
              body: bodyMessage,
            },
          });
        if(result.successCount > 0) {
          return res.status(200).json({
            ok: true,
            msg: 'Notification sent',
          });
        } else {
          return res.status(400).json({
            ok: false,
            msg: 'Notifications could not be sent'
          })
        }
      } else {
        return res.status(400).json({
          ok: false,
          msg: 'Something wents wrong sending notification',
        });
      }
    } else {
      return res.status(400).json({
        ok: false,
        msg: 'Name does not exist, try it with another',
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'An error occurred while generating the notification',
      error: error.message,
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { deviceToken } = req.body;
    if (deviceToken) {
      const deviceTokenSaved = await service.saveDeviceToken({
        deviceToken,
      });
      if (deviceTokenSaved) {
        return res.status(200).json({
          ok: true,
          msg: 'This is the device token saved',
          deviceToken: deviceTokenSaved,
        });
      }
    } else {
      return res.status(400).json({
        ok: false,
        msg: 'Something wents wrong to save device token',
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'An error occurred saving device token to notification',
      error: error.message,
    });
  }
});
module.exports = router;
