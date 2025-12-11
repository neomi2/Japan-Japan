import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: { type: String,required: true },
    orderDate:{ type: Date,required: true },
    orderDeadline: { type: Date, required: true },
    orderAdress: { type: String, require: true },
    clientID: { type: String, require: true },
    isOrderSent:{type:Boolean, require: true }
})

export const Order=mongoose.model('orders',orderSchema); 