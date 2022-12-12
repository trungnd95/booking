import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user';
import { verifyAdmin, verifyUser } from '../middlewares/verifyAuth';

const router = express.Router();

// update
router.post('/', verifyUser, updateUser);

// delete
router.delete('/', verifyUser, deleteUser);

// get
router.get('/:id', verifyUser, getUser);

// get all
router.get('/', verifyAdmin, getUsers);
export default router;
