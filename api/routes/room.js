import express from 'express';
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  getRoomsInHotel,
  updateRoom,
  updateRoomAvailability
} from '../controllers/room';
import { verifyAdmin } from '../middlewares/verifyAuth';

const router = express.Router({ mergeParams: true });

// Create
router.post('', verifyAdmin, createRoom);

// Update
router.put('/:id', verifyAdmin, updateRoom);

router.put('/:id/availability', updateRoomAvailability);

// delete
router.delete('/:id', verifyAdmin, deleteRoom);

// Get Room
router.get('/:id', getRoom);

// Get alls
router.get('/all', getAllRooms);

router.get('/', getRoomsInHotel);

export default router;
