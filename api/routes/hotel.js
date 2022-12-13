import express from 'express';
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from '../controllers/hotel';

const router = express.Router();

// CREATE
router.post('/', createHotel);

// UPDATE
router.put('/:id', updateHotel);

// DELETE
router.delete('/:id', deleteHotel);

// READ ONE
router.get('/:id', getHotel);

// READ ALL
router.get('/', getHotels);

export default router;
