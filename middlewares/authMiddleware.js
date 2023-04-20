import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';

// protected routes token base

export const requireSignIn = async (req, res, next) => {
    try {
        console.log("Headers--->",req.headers.authorization);
        if(!req.headers.authorization){
            return res.status(400).json({
                success:false,
                message:"Please provide token value"
            })
        }
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();

    } catch (error) {
        console.log("Error in middleware--->", error);
    }

}
// admin access
export const isAdmin = async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role !==1){
            return res.status(401).send({
                success:false,
                message:"Unauthorized Access"
            })
        }
        else{
            next()
        }
        
    } catch (error) {
        console.log("Error in middleware--->", error);
        res.status(401).send({
            success:false,
            message:"Error in admin middleware",
            error:error.message
        })
    }
}