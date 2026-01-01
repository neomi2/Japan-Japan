import mongoose from "mongoose";
// Creating a new schema that defines the user structure
const userSchema = new mongoose.Schema({
    userId: { type: String},
    userEmail: { type: String,required: true },//Email is required
    userName: { type: String,required: true},//name is required
    userPassword: { type: String,required: true},//Password is required
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },//only ADMIN or USER values are allowed, default is USER
    createdAt: { type: Date, default: Date.now },// Date when the user was created,default is now


}) 

export const userModel=mongoose.model('users',userSchema);// Creating a model that work with users in the database 