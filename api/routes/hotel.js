import express from 'express';
import {
  createHotel,
  deleteHotel,
  getFeaturedCity,
  getHotel,
  getHotels,
  // eslint-disable-next-line prettier/prettier
  updateHotel
} from '../controllers/hotel';

const router = express.Router();

// CREATE
router.post('/', createHotel);

// UPDATE
router.put('/:id', updateHotel);

// DELETE
router.delete('/:id', deleteHotel);

// READ FEATURED HOTELS
router.get('/featuredCity', getFeaturedCity);

// READ ONE
router.get('/:id', getHotel);

// READ ALL
router.get('/', getHotels);

export default router;
