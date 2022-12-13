import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user';
import { verifyAdmin, verifyUser } from '../middlewares/verifyAuth';

const router = express.Router();

// update
router.put('/:id', verifyUser, updateUser);

// delete
router.delete('/:id', verifyUser, deleteUser);

// get
router.get('/:id', verifyUser, getUser);

// get all
router.get('/', verifyAdmin, getUsers);

export default router;
