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
    const hotel = await Hotel.findOne({ _id: req.params.hotelId });
    if (!hotel) res.status(400).json({ msg: 'Hotel not found' });
    const room = new Room(req.body);
    const savedRoom = await room.save({ session });
    // eslint-disable-next-line no-underscore-dangle
    hotel.rooms.push(savedRoom._id);
    await hotel.save({ session });
    // await Hotel.findOneAndUpdate(
    //   { _id: req.params.hotelId },
    //   // eslint-disable-next-line no-underscore-dangle
    //   { $push: { rooms: savedRoom._id } },
    //   { session },
    // );
    await session.commitTransaction();
    res.status(201).json({ room, hotel });
  } catch (err) {
    session.abortTransaction();
  }
};

/**
 * Update room
 * @param {*} req
 * @param {*} res
 */
export const updateRoom = async (req, res) => {};

/**
 * Get room by id
 * @param {*} req
 * @param {*} res
 */
export const getRoom = async (req, res) => {};

/**
 *Get all rooms
 * @param {*} req
 * @param {*} res
 */
export const getRooms = async (req, res) => {};

/**
 * Delete room
 * @param {*} req
 * @param {*} res
 */
export const deleteRoom = async (req, res) => {};
