import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};

mongoose.connection.on('connected', () => {
  console.log('Connected to DB');
});

mongoose.connection.on('disconnected', () => {
  console.log('Connected to DB');
});

app.listen(8800, () => {
  connectDB();
  console.log('App Running...');
});
