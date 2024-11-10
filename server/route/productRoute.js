import express from 'express'
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, filterProductController, getAllProductsController, getSingleProductController, productCategoryController, productListController, productSortController, searchProductController, similarProductController, totalProductController, updateProductHandler } from '../controller/productController.js';
import uploads from '../config/multer.js';
import { isAdmin, isRequire } from '../MiddleWare/authMiddleware.js';

let route=express.Router();
//create product || post
route.post('/createproduct',isRequire,isAdmin,uploads.array('images',4),createProductController);

//all products || get
route.get('/allproducts',getAllProductsController);

//single product || get
route.get('/singleproduct/:id',getSingleProductController);

//delete product || delete
route.delete('/deleteproduct/:id',isRequire,isAdmin,deleteProductController);

//update product || put
route.put('/updateproduct/:id',isRequire,isAdmin,uploads.array('images',4),updateProductHandler);

//filter products || post
route.post('/filterproducts',filterProductController)

//get total products count
route.get('/totalproducts',totalProductController);

//get limited data load more || get
route.get('/productlist/:count',productListController)

//similar products || get
route.get('/similar-product/:p_id/:c_id',similarProductController);

//search products || get
route.get('/searchproduct/:keyword',searchProductController);

//category by slug || get
route.get('/product-category/:slug',productCategoryController);

//braintreetoken ||get
route.get('/braintree/token',braintreeTokenController)

// payment
route.post('/braintree/payment',isRequire,braintreePaymentController)

route.get('/sorting/:value',productSortController)
export default route;