import express from 'express';

import {getTotalPages,getMeals,getMealById,createMeal,deleteMeal,updateMeal}from "../controllers/mealController.js";
//All the functions paths
const router = express.Router();// Create a router to connect paths with functions
router.get('/pages', getTotalPages);
router.get('/', getMeals);
router.get('/:id', getMealById);
router.post('/', createMeal);
router.delete('/:id', deleteMeal);
router.put('/:id', updateMeal);

export default router;