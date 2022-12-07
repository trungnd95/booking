import dotenv from 'dotenv';
import express from 'express';
import { connect } from './helpers/db';
import authRoutes from './routes/auth';
import hotelsRoutes from './routes/hotels';
import roomsRoutes from './routes/rooms';
import usersRoutes from './routes/users';

const app = express();
dotenv.config();

// Routes
app.use('/auth', authRoutes);
app.use('/hotel', hotelsRoutes);
app.use('/rooms', roomsRoutes);
app.use('/users', usersRoutes);

app.listen(8800, () => {
  connect();
});
