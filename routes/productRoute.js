import express from 'express';
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
const router = express.Router();
import formidable from 'express-formidable'

// create product
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)
// update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)
// get products
router.get('/get-product',getProductController);
// single product
router.get('/get-product/:slug',getSingleProductController)
//get photo
router.get('/product-photo/:pid',productPhotoController) 
// delete product
router.delete('/delete-product/:pid',deleteProductController)
// filter product
router.post('/product-filter',productFilterController)
// pcount for pagination
router.get('/product-count',productCountController) 

// product per page
router.get('/product-list/:page',productListController)

// search product
router.get('/search/:keyword',searchProductController)

// similar product
router.get('/related-product/:pid/:cid',relatedProductController)

// category wise product
router.get('/product-category/:slug',productCategoryController)
// payment routes
// token
router.get('/braintree/token',braintreeTokenController)
// payment
router.post('/braintree/payment',requireSignIn,braintreePaymentController)
export default router