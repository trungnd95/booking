import 'express-async-errors';
import Hotel, { validateInput } from '../models/Hotel';

/**
 * Create hotel
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function createHotel(req, res) {
  // 1. Validate user input
  const { error } = validateInput(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // 2. Create user
  const newHotel = new Hotel(req.body);
  await newHotel.save();
  return res.status(201).json(newHotel);
}

/**
 * Update hotel
 * @param {*} req
 * @param {*} res
 */
export async function updateHotel(req, res) {
  const user = await Hotel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true },
  );
  res.status(200).json(user);
}

/**
 * Delete hotel
 * @param {*} req
 * @param {*} res
 */
export async function deleteHotel(req, res) {
  await Hotel.findOneAndDelete({ _id: req.params.id });
  res.status(200).json({ msg: 'Hotel has been deleted' });
}

/**
 * Get featured hotels
 * @param {*} req
 * @param {*} res
 */
export async function getFeaturedCity(req, res) {
  const result = await Hotel.aggregate([
    {
      $group: {
        _id: '$city',
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 3,
    },
  ]).exec();
  res.status(200).json(result);
}

/**
 * Count number of each properties
 * @param {*} req
 * @param {*} res
 */
export async function countProperties(req, res) {
  const result = await Hotel.aggregate([
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 },
      },
    },
  ]).exec();
  res.status(200).json(result);
}

/**
 * Get hotel
 * @param {*} req
 * @param {*} res
 */
export async function getHotel(req, res) {
  const user = await Hotel.findOne({ _id: req.params.id });
  res.status(200).json(user);
}

/**
 * Get all hotels
 * @param {*} req
 * @param {*} res
 */
export async function getHotels(req, res) {
  const { min, max, limit, ...others } = req.query;
  const hotels = await Hotel.find({
    ...others,
    cheapestPrice: {
      $gte: min || 10,
      $lte: max || 200,
    },
  }).limit(limit);
  res.status(200).json(hotels);
}
