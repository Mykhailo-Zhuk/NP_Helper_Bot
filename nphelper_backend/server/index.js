import express from 'express';
import mongoose from 'mongoose';
import router from './Router/router.js';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

const port = 5000;

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api', router);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/plain');
  next();
});

async function startApp() {
  try {
    await mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
    app.listen(port, () => console.log('Server starting'));
  } catch (error) {
    console.log(error.message);
  }
}
startApp();
