// // Import Order model
// import { Order } from "../models/orderModel.js";

// // Add a new order
// export const addOrder = async (req, res) => {
//   try {
//     // Create a new Order instance from request body
//     const order = new Order(req.body);

//     // Save the order in the database
//     const savedOrder = await order.save();

//     // Return the saved order
//     return res.status(201).json(savedOrder);
//   } catch (err) {
//     return res.status(500).json({
//       title: "Error adding order",
//       message: err.message
//     });
//   }
// };

// // Remove an order by ID (only admin or owner, only if not sent)
// export const removeOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { userID, isAdmin } = req.body;
//     // userID = the user requesting deletion
//     // isAdmin = boolean flag indicating if the user is admin

//     // Find the order first
//     const order = await Order.findById(id);

//     if (!order)
//       return res.status(404).json({
//         title: "Order not found",
//         message: "Cannot delete"
//       });

//     // Allow deletion only if user is admin or owner, and order not sent
//     if (!isAdmin && order.clientID !== userID)
//       return res.status(403).json({
//         title: "Forbidden",
//         message: "You are not allowed to delete this order"
//       });

//     if (order.isOrderSent)
//       return res.status(400).json({
//         title: "Cannot delete",
//         message: "Order has already been sent"
//       });

//     // Delete the order
//     const deletedOrder = await Order.findByIdAndDelete(id);
//     return res.json(deletedOrder);

//   } catch (err) {
//     return res.status(500).json({
//       title: "Error deleting order",
//       message: err.message
//     });
//   }
// };

// // Get all orders
// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({}).populate("meals.mealId");
//     return res.status(200).json(orders);
//   } catch (err) {
//     console.error("GET ALL ORDERS ERROR:", err);
//     return res.status(500).json({
//       title: "Error retrieving orders",
//       message: err.message
//     });
//   }
// };


// // Get orders by client ID
// export const getOrdersByClient = async (req, res) => {
//   try {
//     const { clientID } = req.params;
//     const orders = await Order.find({ clientID }).populate("meals.mealId");
//     return res.json(orders);
//   } catch (err) {
//     return res.status(500).json({
//       title: "Error retrieving orders",
//       message: err.message
//     });
//   }
// };

// // Mark an order as sent
// export const markOrderSent = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Update isOrderSent to true
//     const order = await Order.findByIdAndUpdate(
//       id,
//       { isOrderSent: true },
//       { new: true }
//     );

//     if (!order)
//       return res.status(404).json({
//         title: "Order not found",
//         message: "Cannot mark as sent"
//       });

//     return res.json(order);
//   } catch (err) {
//     return res.status(500).json({
//       title: "Error updating order",
//       message: err.message
//     });
//   }
// };

import { Order } from "../models/orderModel.js";
import { Meal } from "../models/mealModel.js";

// Adds a new order to the database
export const addOrder = async (req, res) => {
  try {
    // Create a new instance of Order with data from request body
    const order = new Order(req.body);

    // Save the order to the MongoDB database
    const savedOrder = await order.save();

    // Respond with 201 Created and the order object
    return res.status(201).json(savedOrder);
  } catch (err) {
    return res.status(500).json({
      title: "Error adding order",
      message: err.message
    });
  }
};

// Removes an order by ID if the user is authorized and the order wasn't sent
// export const removeOrder = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     const order = await Order.findById(orderId);

//     if (!order)
//       return res.status(404).json({
//         title: "Order not found",
//         message: "The requested order ID does not exist"
//       });

//     if (order.isOrderSent)
//       return res.status(400).json({
//         title: "Cannot delete",
//         message: "Order has already been marked as sent and cannot be canceled"
//       });

//     const deletedOrder = await Order.findByIdAndDelete(orderId);

//     return res.json({
//       message: "Order removed successfully",
//       deletedOrder
//     });

//   } catch (err) {
//     return res.status(500).json({
//       title: "Error deleting order",
//       message: err.message
//     });
//   }
// };

export const removeOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findByIdAndDelete(id);

    if (!order)
      return res.status(404).json({
        title: "error deleting",
        message: "order not found",
      });

    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({
      title: "Error deleting order",
      message: err.message,
    });
  }
};

// Retrieves all orders and fills in meal details using populate
export const getAllOrders = async (req, res) => {
  try {
    // Find all orders and populate meal details (using Meal model variable to fix gray color)
    const orders = await Order.find({}).populate({
        path: "meals.mealId",
        model: Meal 
    });
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({
      title: "Error retrieving orders",
      message: err.message
    });
  }
};

// Retrieves all orders for a specific client
export const getOrdersByClient = async (req, res) => {
  try {
    const { clientID } = req.params;
    
    // Find orders filtered by clientID and populate meal details
    const orders = await Order.find({ clientID }).populate({
        path: "meals.mealId",
        model: Meal
    });
    
    if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found for this client" });
    }

    return res.json(orders);
  } catch (err) {
    return res.status(500).json({
      title: "Error retrieving client orders",
      message: err.message
    });
  }
};

// Updates an order's status to sent
export const markOrderSent = async (req, res) => {
  try {
    const { id } = req.params;

    // Update the isOrderSent boolean to true and return the updated document
    const order = await Order.findByIdAndUpdate(
      id,
      { isOrderSent: true },
      { new: true } 
    );

    if (!order)
      return res.status(404).json({
        title: "Order not found",
        message: "Cannot update status: Order ID not found"
      });

    return res.json(order);
  } catch (err) {
    return res.status(500).json({
      title: "Error updating order status",
      message: err.message
    });
  }
};