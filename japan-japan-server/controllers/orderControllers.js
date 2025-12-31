import { Order } from "../models/orderModel.js";


export const addOrder=async(req,res)=>{
try{
const order=new Order(req.body);
const savedOrder=await order.save();
return res.status(201).json(savedOrder);
}catch(err){
return res.status(500).json({title:"Error adding order",message:err.message});
}
};


export const removeOrder=async(req,res)=>{
try{
const{id}=req.params;
const order=await Order.findByIdAndDelete(id);
if(!order)return res.status(404).json({title:"Order not found",message:"Cannot delete"});
return res.json(order);
}catch(err){
return res.status(500).json({title:"Error deleting order",message:err.message});
}
};

export const getAllOrders=async(req,res)=>{
try{
const orders=await Order.find({}).populate("meals.mealId");
return res.json(orders);
}catch(err){
return res.status(500).json({title:"Error retrieving orders",message:err.message});
}
};

export const getOrdersByClient=async(req,res)=>{
try{
const{clientID}=req.params;
const orders=await Order.find({clientID}).populate("meals.mealId");
return res.json(orders);
}catch(err){
return res.status(500).json({title:"Error retrieving orders",message:err.message});
}
};

export const markOrderSent = async (req, res) => {
  try {
    const { id } = req.params; 
    const order = await Order.findByIdAndUpdate(
      id,
      { isOrderSent: true },
      { new: true }
    );
    if (!order)
      return res.status(404).json({ title: "Order not found", message: "Cannot mark as sent" });
    return res.json(order);
  } catch (err) {
    return res.status(500).json({ title: "Error updating order", message: err.message });
  }
};