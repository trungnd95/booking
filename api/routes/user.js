import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user';

const router = express.Router();

// update
router.post('/', updateUser);

// delete
router.delete('/', deleteUser);

// get
router.get('/:id', getUser);

// get all
router.get('/', getUsers);
export default router;
