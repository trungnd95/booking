import mongoose from 'mongoose';

export async function connect() {
  await mongoose.connect(process.env.MONGO_URL);
}

export async function disconnect() {
  await mongoose.disconnect();
}
