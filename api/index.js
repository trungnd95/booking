import dotenv from 'dotenv';
import express from 'express';
import winston from 'winston';
import { connect } from './helpers/db';
import error from './helpers/error';
import authRoutes from './routes/auth';
import hotelRoutes from './routes/hotel';
import roomRoutes from './routes/room';
import userRoutes from './routes/user';

const app = express();
dotenv.config();
winston.add(new winston.transports.File({ filename: 'log.txt' }));

app.use(express.json());
// Routes
app.use('/auth', authRoutes);
app.use('/hotels', hotelRoutes);
app.use('/rooms', roomRoutes);
app.use('/users', userRoutes);

app.use(error);

app.listen(8800, () => {
  connect();
});
