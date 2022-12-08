import express from 'express';
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from '../controllers/hotel';

const router = express.Router();

// CREATE
router.post('/', createHotel);

// READ ONE
router.get('/:id', getHotel);

// READ ALL
router.get('/', getHotels);

// UPDATE
router.put('/:id', updateHotel);

// DELETE
router.delete('/:id', deleteHotel);

export default router;
