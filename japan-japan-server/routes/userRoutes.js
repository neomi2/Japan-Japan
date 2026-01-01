import express from 'express';
import { addUser, login, getUsers } from "../controllers/userControllers.js";
//All the functions paths
const router = express.Router();// Create a router to connect paths with functions
router.post('/', addUser);
router.post('/login', login);
router.get('/', getUsers);

export default router; 