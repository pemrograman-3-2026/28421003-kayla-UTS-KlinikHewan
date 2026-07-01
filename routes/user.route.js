import express from 'express'
import { register, login, getAllUsers, deleteUser } from '../controllers/user.controller.js'; 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser); 

export default router;