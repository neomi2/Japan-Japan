import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    mealname: { type: String,required: true },
    mealDescription:{ type: String,required: true },
    mealprice:{type:Number,required: true},
    mealImage: { type: String, default: '' } 


})

export const Meal=mongoose.model('meals',mealSchema); 