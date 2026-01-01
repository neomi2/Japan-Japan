import mongoose from "mongoose";
// Creating a new schema that defines the order structure
const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true }, // Unique order identifier
  orderDate: { type: Date, required: true }, // Order creation date
  orderDeadline: { type: Date, required: true }, // Order delivery deadline
  orderAdress: { type: String, required: true }, // Delivery address
  clientID: { type: String, required: true }, // Client identifier
  meals: [{
      mealId: { type: mongoose.Schema.Types.ObjectId, ref: "meals", required: true }, // Reference to Meal document
      quantity: { type: Number,required: true,min: 1}, // Quantity of the meal
    },],
  isOrderSent: { type: Boolean,default: false}, // Indicates whether the order was sent
});

export const Order = mongoose.model("orders", orderSchema);// Creating a model that work with orders in the database 