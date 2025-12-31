import express from 'express';
import { addUser, login, getUsers } from "../controllers/userControllers.js";

const router = express.Router();
router.post('/', addUser);
router.post('/login', login);
router.get('/', getUsers);

export default router;