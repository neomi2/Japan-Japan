// Import Meal model
import { Meal } from "../models/mealModel.js";

// Get total number of pages (for pagination)
export const getTotalPages = async (req, res) => {
  let limit = req.query.limit || 2; // Number of items per page
  try {
    let count = await Meal.countDocuments(); // Count all meals
    let totalPages = Math.ceil(count / limit);
    return res.json({ totalPages });
  } catch (err) {
    return res.status(500).json({
      title: "Error retrieving total pages",
      message: err
    });
  }
};

// Get meals with pagination
export const getMeals = async (req, res) => {
  let limit = req.query.limit || 2; // Items per page
  let page = req.query.page || 1;   // Current page
  try {
    let meals = await Meal.find({})
      .skip((page - 1) * limit)
      .limit(limit);
    return res.json(meals);
  } catch (err) {
    return res.status(500).json({
      title: "Error retrieving meals",
      message: err
    });
  }
};

// Get a single meal by ID
export const getMealById = async (req, res) => {
  try {
    const { id } = req.params;
    let meal = await Meal.findOne({ id }); // Can also be retrieved using findById
    if (!meal)
      return res.status(404).json({
        title: "no such meal",
        message: "meal not found"
      });
    return res.json(meal);
  } catch (err) {
    return res.status(500).json({
      title: "Error retrieving meal",
      message: err
    });
  }
};

// Create a new meal
export const createMeal = async (req, res) => {
  try {
    // Validate request body
    if (!req.body)
      return res.status(400).json({
        title: "missing body",
        message: "no data"
      });

    let { mealname, mealDescription, mealprice, mealImage } = req.body;

    // Validate required fields
    if (!mealname || !mealDescription || !mealprice || !mealImage)
      return res.status(400).json({
        title: "missing data",
        message: "name, description, price, image are required"
      });

    // Validate meal price
    if (mealprice <= 0)
      return res.status(400).json({
        title: "invalid data",
        message: "price must be greater than 0"
      });

    // Check for duplicate meal
    let already = await Meal.findOne({ mealname, mealDescription });
    if (already)
      return res.status(409).json({
        title: "duplicate meal",
        message: "a meal with the same name and description already exists"
      });

    // Create and save new meal
    const newMeal = new Meal({ mealname, mealDescription, mealprice, mealImage });
    let meal = await newMeal.save();

    return res.status(201).json(meal);
  } catch (err) {
    return res.status(500).json({
      title: "Error creating meal",
      message: err
    });
  }
};

// Delete a meal by ID
export const deleteMeal = async (req, res) => {
  try {
    const id = req.params.id;
    let meal = await Meal.findByIdAndDelete(id);

    if (!meal)
      return res.status(404).json({
        title: "error deleting",
        message: "meal not found"
      });

    return res.status(200).json(meal);
  } catch (err) {
    return res.status(500).json({
      title: "Error deleting meal",
      message: err
    });
  }
};

// Update a meal by ID
export const updateMeal = async (req, res) => {
  try {
    const id = req.params.id;
    let { mealname, mealDescription, mealprice, mealImage } = req.body;

    let updateObject = {};

    // Update only provided fields
    if (mealname !== undefined) updateObject.mealname = mealname;

    if (mealprice !== undefined) {
      if (mealprice <= 0)
        return res.status(400).json({
          title: "invalid data",
          message: "price must be greater than 0"
        });
      updateObject.mealprice = mealprice;
    }

    if (mealDescription !== undefined)
      updateObject.mealDescription = mealDescription;

    if (mealImage !== undefined)
      updateObject.mealImage = mealImage;

    let meal = await Meal.findByIdAndUpdate(id, updateObject, { new: true });

    if (!meal)
      return res.status(404).json({
        title: "error updating",
        message: "meal not found"
      });

    return res.json(meal);
  } catch (err) {
    return res.status(500).json({
      title: "Error updating meal",
      message: err
    });
  }
};