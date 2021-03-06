const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { firebaseAdmin } = require('./helpers/configFirebase');
const shareableLinkRouter = require('./routes/shareableLinkRouter');
const notificationRouter = require('./routes/notificationRouter');
const app = express();

app.use(cors());

app.use(express.json()); //parse -> application/json

firebaseAdmin.getInstance();

app.use('/shareablelinks', shareableLinkRouter);
app.use('/notifications', notificationRouter);


const port = process.env.PORT || 8080;
const uriDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/reachyeti';

const optionsMongoose = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

mongoose
  .connect(uriDB, optionsMongoose)
  .then(() => console.log('Mongo database is online'))
  .catch((error) => console.log(error));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
