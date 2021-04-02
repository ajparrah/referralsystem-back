const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const shareableLinkRouter = require('./routes/shareableLinkRouter');
const app = express();

app.use(cors());

app.use(express.json()); //parse -> application/json

app.use('/shareablelinks', shareableLinkRouter);

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
