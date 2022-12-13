import Hotel from '../models/Hotel';

export default async function verifyHotel(req, res, next) {
  const hotel = await Hotel.findOne({ _id: req.params.hotelId });
  if (!hotel) res.status(400).json({ msg: 'Invalid request' });
  next();
}
