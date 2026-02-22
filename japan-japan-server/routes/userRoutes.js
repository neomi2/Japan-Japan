import express from 'express';
import {authMiddleware,authManagerMiddleware} from "../middlewares/auth.js";
import { addUser, login, getUsers } from "../controllers/userControllers.js";
//All the functions paths
const router = express.Router();// Create a router to connect paths with functions
router.post('/', addUser);
router.post('/login', login);
router.get('/', authMiddleware,authManagerMiddleware,getUsers);

export default router;     