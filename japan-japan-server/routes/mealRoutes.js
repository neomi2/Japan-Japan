import express from 'express';


import {getTotalPages,getMeals,getMealById,createMeal,deleteMeal,updateMeal}from "../controllers/mealController.js";

const router = express.Router();
router.get('/pages', getTotalPages);
router.get('/', getMeals);
router.get('/:id', getMealById);
router.post('/', createMeal);
router.delete('/:id', deleteMeal);
router.put('/:id', updateMeal);

export default router;