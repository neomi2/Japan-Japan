import express from 'express';

import {addOrder,removeOrder,getAllOrders,getOrdersByClient,markOrderSent}from "../controllers/orderControllers.js";
//All the functions paths
const router = express.Router(); //Create a router to connect paths with functions
router.post('/', addOrder);
router.delete('/:id', removeOrder);
router.get('/', getAllOrders);
router.get('/:clientID', getOrdersByClient); 
router.patch('/:id/sent', markOrderSent);

export default router; 