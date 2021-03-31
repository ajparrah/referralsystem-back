const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const app = express();

app.use(express.json()); //parse -> application/json

app.use('/users', userRouter);

const port = 8080;
const optionsMongoose = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

mongoose
  .connect('mongodb://localhost:27017/reachyeti', optionsMongoose)
  .then(() => console.log('Mongo database is online'))
  .catch((error) => console.log(error));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
