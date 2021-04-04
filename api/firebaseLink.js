const fetch = require('node-fetch');

const domainPrefix =
  process.env.URL_PREFIX || 'https://reachyetitest.page.link';
const domainApp = process.env.URL_APP_CONNECT || 'http://localhost:3000';
const appKeyFirebase =
  process.env.API_KEY_FIREBASE || 'AIzaSyAPUpd1i_IX7JmGYtfaKLoLNvBc9gr-hdo';
const urlFirebase = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${appKeyFirebase}`;
const packageName = process.env.PACKAGE_NAME_APP || 'com.reachyetiapp';
const packageNameIOS = process.env.PACKAGE_NAME_APP_IOS || 'org.reactjs.native.example.reachyetiapp';

const getBodyParsed = (name) => {
  const bodyParsed = JSON.stringify({
    dynamicLinkInfo: {
      domainUriPrefix: domainPrefix,
      link: `${domainApp}/${name}`,
      androidInfo: {
        androidPackageName: packageName,
        androidFallbackLink: `${domainApp}/${name}`,
      },
      iosInfo: {
        iosBundleId: packageNameIOS,
        iosFallbackLink: `${domainApp}/${name}`,
      },
    },
    suffix: {
      option: 'SHORT',
    },
  });
  return bodyParsed;
};

const generateDinamicLink = async (name) => {
  try {
    const urlConfigBody = getBodyParsed(name);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: urlConfigBody,
    };
    const response = await fetch(urlFirebase, options);
    const data = await response.json();
    if (data.shortLink) {
      return data.shortLink;
    } else {
      const {
        error: { message },
      } = data;
      throw new Error(message);
    }
  } catch (error) {
    console.log('Error on fetch firebase', error);
    throw error;
  }
};

module.exports = generateDinamicLink;
