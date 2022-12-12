import express from 'express';
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from '../controllers/room';
import { verifyAdmin } from '../middlewares/verifyAuth';

const router = express.Router({ mergeParams: true });

// Create
router.post('', verifyAdmin, createRoom);

// Update
router.post('/', verifyAdmin, updateRoom);

// delete
router.delete('/', verifyAdmin, deleteRoom);

// Get Room
router.get('/:id', getRoom);

// Get alls
router.get('/', getRooms);

export default router;
