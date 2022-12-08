import 'express-async-errors';
import Hotel, { validateInput } from '../models/Hotel';

export async function createHotel(req, res) {
  // 1. Validate user input
  const { error } = validateInput(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // 2. Create user
  const newHotel = new Hotel(req.body);
  await newHotel.save();
  return res.status(201).json(newHotel);
}

export async function getHotel(req, res) {
  const user = await Hotel.findOne({ _id: req.params.id });
  res.status(200).json(user);
}

export async function getHotels(req, res) {
  const users = await Hotel.find({});
  res.status(200).json(users);
}

export async function updateHotel(req, res) {
  const user = await Hotel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true },
  );
  res.status(200).json(user);
}

export async function deleteHotel(req, res) {
  await Hotel.findOneAndDelete({ _id: req.params.id });
  res.status(200);
}
