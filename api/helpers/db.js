import mongoose from 'mongoose';

export async function connect() {
  await mongoose.connect(process.env.MONGODB_URI);
}

export async function disconnect() {
  await mongoose.disconnect();
}
