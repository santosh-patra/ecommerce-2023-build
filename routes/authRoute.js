import express from 'express';
import { forgetPasswordController, getAllOrdersController, getOrdersController, loginController, orderStatusController, registerController, testController, updateProfileController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
// router object
const router = express.Router();

// routing
// Register
router.post('/register', registerController);
router.post('/login',loginController);

// forget password
router.post('/forget-password',forgetPasswordController)

// test routes
router.get('/test',requireSignIn,isAdmin,testController)

// protected user routes
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})
// protected admin routes
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})
// update profile
router.put('/profile',requireSignIn,updateProfileController)

// orders
router.get('/orders',requireSignIn,getOrdersController)
// all orders
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController)

// order status update
router.put('/order-status/:orderId',requireSignIn,isAdmin,orderStatusController)

export default router;
