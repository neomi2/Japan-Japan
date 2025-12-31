import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  orderDate: { type: Date, required: true },
  orderDeadline: { type: Date, required: true },
  orderAdress: { type: String, required: true },
  clientID: { type: String, required: true },
  meals: [
    {mealId: {type: mongoose.Schema.Types.ObjectId,
        ref: "meals",required: true,},
      quantity: { type: Number, required: true, min: 1 },
    },],
  isOrderSent: { type: Boolean, default: false },
});

export const Order=mongoose.model("orders", orderSchema);