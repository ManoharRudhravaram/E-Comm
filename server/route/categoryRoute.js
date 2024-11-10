import express from 'express';
import { isAdmin, isRequire } from '../MiddleWare/authMiddleware.js';
import { allCategoryController, createCategoryController, deleteCategoryController, updateCategoryController } from '../controller/categoryController.js';

let route=express.Router();

//create-category || post
route.post('/create-category',isRequire,isAdmin,createCategoryController)

//all category || get
route.get('/all-category',allCategoryController)

//delete category || delete
route.delete('/delete-category/:id',isRequire,isAdmin,deleteCategoryController)

//update category || post
route.put('/update-category/:id',isRequire,isAdmin,updateCategoryController)

export default route