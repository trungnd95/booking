import mongoose from 'mongoose';
import Hotel from '../models/Hotel';
import Room, { validateInput } from '../models/Room';

/**
 * Create new room
 * @param {*} req
 * @param {*} res
 */
export const createRoom = async (req, res) => {
  // 1. Validate user input
  const { error } = validateInput(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // 2. Create transaction to create room and update hotel
  const session = await mongoose.connection.startSession();
  try {
    session.startTransaction();
    const room = new Room(req.body);
    const savedRoom = await room.save({ session });
    const updatedHotel = await Hotel.findOneAndUpdate(
      { _id: req.params.hotelId },
      // eslint-disable-next-line no-underscore-dangle
      { $push: { rooms: savedRoom._id } },
      { session },
    );
    await session.commitTransaction();
    res.status(201).json({ savedRoom, updatedHotel });
  } catch (err) {
    await session.abortTransaction();
  }
};

/**
 * Update room
 * @param {*} req
 * @param {*} res
 */
export const updateRoom = async (req, res) => {
  const updatedRoom = await Room.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true },
  );
  res.status(200).json(updatedRoom);
};

/**
 * Get room by id
 * @param {*} req
 * @param {*} res
 */
export const getRoom = async (req, res) => {
  const room = await Room.findOne({ _id: req.params.id });
  res.status(200).json(room);
};

/**
 *Get all rooms
 * @param {*} req
 * @param {*} res
 */
export const getRooms = async (req, res) => {
  const rooms = await Room.find();
  res.status(200).json(rooms);
};

/**
 * Delete room
 * @param {*} req
 * @param {*} res
 */
export const deleteRoom = async (req, res) => {
  // Create transaction to delete room and remove room from hotel
  const session = await mongoose.connection.startSession();
  try {
    session.startTransaction();
    await Room.deleteOne({ _id: req.params.id }, { session });
    await Hotel.findOneAndUpdate(
      { _id: req.params.hotelId },
      { $pull: { rooms: req.params.id } },
      { session },
    );
    await session.commitTransaction();
    res.status(200).json({ msg: 'Room has been deleted' });
  } catch (err) {
    await session.abortTransaction();
  }
};
