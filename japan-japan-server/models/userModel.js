import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: { type: String},
    userEmail: { type: String,required: true },
    userName: { type: String,required: true},
    userPassword: { type: String,required: true},
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    createdAt: { type: Date, default: Date.now },


})

export const userModel=mongoose.model('users',userSchema);