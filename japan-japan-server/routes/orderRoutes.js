import express from 'express';


import {addOrder,removeOrder,getAllOrders,getOrdersByClient,markOrderSent}from "../controllers/orderControllers.js";

const router = express.Router();
router.post('/', addOrder);
router.delete('/:id', removeOrder);
router.get('/', getAllOrders);
router.post('/client', getOrdersByClient);
router.patch('/:id/sent', markOrderSent);

export default router;