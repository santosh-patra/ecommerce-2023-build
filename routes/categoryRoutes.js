import express from 'express';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';
const router = express.Router();
import {requireSignIn,isAdmin} from '../middlewares/authMiddleware.js'

// create category
router.post('/create-category', requireSignIn,isAdmin, createCategoryController );
// update category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController);
// get all category
router.get('/get-category',categoryController)

// get single category
router.get('/single-category/:slug',singleCategoryController);
// delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController);

export default router