import express from 'express';
import { isAdmin, isRequire } from '../MiddleWare/authMiddleware.js';
import { allOrderController, updateOrderStatusController, userOrderController } from '../controller/orderController.js';

let route=express.Router();
//uer orders || GET
route.get('/orders',isRequire,userOrderController);

//order || GET (allOrder)
route.get('/all-orders',isRequire,isAdmin,allOrderController);

//update status of order || PUT
route.put('/update-order/:id',isRequire,isAdmin, updateOrderStatusController)

export default route