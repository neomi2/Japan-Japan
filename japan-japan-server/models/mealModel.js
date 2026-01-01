import mongoose from "mongoose";
// Creating a new schema that defines the meal structure
const mealSchema = new mongoose.Schema({
    mealname: { type: String,required: true },//name is required
    mealDescription:{ type: String,required: true },//mealDescription is required
    mealprice:{type:Number,required: true},//mealprice is required
    mealImage: { type: String, default: '' } //default is ''


})

export const Meal=mongoose.model('meals',mealSchema);// Creating a model that work with meals in the database 