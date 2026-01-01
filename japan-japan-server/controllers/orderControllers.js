// Import Order model
import { Order } from "../models/orderModel.js";

// Add a new order
export const addOrder = async (req, res) => {
  try {
    // Create a new Order instance from request body
    const order = new Order(req.body);

    // Save the order in the database
    const savedOrder = await order.save();

    // Return the saved order
    return res.status(201).json(savedOrder);
  } catch (err) {
    return res.status(500).json({
      title: "Error adding order",
      message: err.message
    });
  }
};

// Remove an order by ID (only admin or owner, only if not sent)
export const removeOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { userID, isAdmin } = req.body; 
    // userID = the user requesting deletion
    // isAdmin = boolean flag indicating if the user is admin

    // Find the order first
    const order = await Order.findById(id);

    if (!order)
      return res.status(404).json({
        title: "Order not found",
        message: "Cannot delete"
      });

    // Allow deletion only if user is admin or owner, and order not sent
    if (!isAdmin && order.clientID !== userID)
      return res.status(403).json({
        title: "Forbidden",
        message: "You are not allowed to delete this order"
      });

    if (order.isOrderSent)
      return res.status(400).json({
        title: "Cannot delete",
        message: "Order has already been sent"
      });

    // Delete the order
    const deletedOrder = await Order.findByIdAndDelete(id);
    return res.json(deletedOrder);

  } catch (err) {
    return res.status(500).json({
      title: "Error deleting order",
      message: err.message
    });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    // Retrieve all orders and populate meal details
    const orders = await Order.find({}).populate("meals.mealId");
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({
      title: "Error retrieving orders",
      message: err.message
    });
  }
};

// Get orders by client ID
export const getOrdersByClient = async (req, res) => {
  try {
    const { clientID } = req.params;
    const orders = await Order.find({ clientID }).populate("meals.mealId");
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({
      title: "Error retrieving orders",
      message: err.message
    });
  }
};

// Mark an order as sent
export const markOrderSent = async (req, res) => {
  try {
    const { id } = req.params;

    // Update isOrderSent to true
    const order = await Order.findByIdAndUpdate(
      id,
      { isOrderSent: true },
      { new: true }
    );

    if (!order)
      return res.status(404).json({
        title: "Order not found",
        message: "Cannot mark as sent"
      });

    return res.json(order);
  } catch (err) {
    return res.status(500).json({
      title: "Error updating order",
      message: err.message
    });
  }
};