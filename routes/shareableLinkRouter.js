const express = require('express');
const { shareableLinkSerializer } = require('../helpers/serializers');
const ShareableLinkService = require('../services/ShareableLinkService');
// const { userLoginValidatePassword } = require('../helpers/validate');
const generateDinamicLink = require('../api/firebaseLink');
const { createLinkMiddlewares } = require('../routes/middlewares/shareableLinkMiddlewares');
const router = express.Router();
const service = new ShareableLinkService();

router.post('/:name', createLinkMiddlewares, async (req, res) => {
  try {
    const { name } = req.params;
    const nameExist = await service.getByName(name);
    if(!nameExist) {
      const dinamicLink = await generateDinamicLink(name);
      const dinamicLinkToAdd = shareableLinkSerializer(dinamicLink, name, req.userId);
      const dinamicLinkSaved = await service.create(dinamicLinkToAdd);
      if(dinamicLinkSaved) {
        return res.status(200).json({
          ok: true,
          msg: 'This is the link to share',
          shareableLink: dinamicLink,
        });
      } else {
        return res.status(500).json({
          ok: false,
          msg: 'An error occurred while saving the shareable link'
        })
      }
    } else {
      return res.status(400).json({
        ok: false,
        msg: 'Name is already exist, try it with another',
      })
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'An error occurred while generating the shareable link',
      error: error.message,
    })
  }
});

router.get('/', async (req, res) => {
  try {
    const dinamicLinks = await service.getAll();
    if(dinamicLinks.length > 0) {
      return res.status(200).json({
        ok: true,
        msg: 'This are all the shareables link',
        shareableLinks: dinamicLinks
      })
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'An error occurred getting the shareable link',
      error: error.message,
    })
  }
});

module.exports = router;
