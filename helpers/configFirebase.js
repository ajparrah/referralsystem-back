const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountFirebase.json');

class firebaseAdmin {
  static getInstance() {
    if (!admin.apps.length) {
      return admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      return admin.app();
    }
  }
}
module.exports = { firebaseAdmin };
