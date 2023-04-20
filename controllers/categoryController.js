import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async(req,res)=>{
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({
                message:"Name is required"
            })
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:"Category Already exist"
            })
        }
        const category = await new categoryModel({name,slug:slugify(name)}).save();
        res.status(201).send({
            success:true,
            message:"New Category created",
            category
        })
        
    } catch (error) {
        console.log("Error--->",err);
        res.status(500).json({
            success:false,
            message:"Error in Category",
            error:error
        })
    }

}

// update category
export const updateCategoryController = async(req,res)=>{
    try {
        const {name} =  req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(200).json({
            success:true,
            message:"Category updated Successfully",
            category
        })
    } catch (error) {
        console.log("Error--->",err);
        res.status(500).json({
            success:false,
            message:"Error while updating category",
            error
        })
    }
}

// get all category;
export const categoryController = async(req,res)=>{
    try {
        const category = await categoryModel.find();

        res.status(200).json({
            success:true,
            message:"All Category lists Fetched",
            category
        })
        
    } catch (error) {
        console.log("Error--->",err);
        res.status(500).json({
            success:false,
            message:"Error while fetching all category",
            error
        })
    }
}
export const singleCategoryController = async(req,res)=>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug});
        res.status(200).json({
            success:true,
            message:"get single category successfully",
            category
        })

        
    } catch (error) {
        console.log("Error--->",err);
        res.status(500).json({
            success:false,
            message:"Error while fetching a single category",
            error
        })
    }
}

export const deleteCategoryController = async(req,res)=>{
    try {
        const {id} = req.params
        const category = await categoryModel.findByIdAndDelete({_id:id});
        res.status(200).json({
            success:true,
            message:" category deleted successfully",
            category
        })
        
    } catch (error) {
        console.log("Error--->",error);
        res.status(500).json({
            success:false,
            message:"Error while deleteing a category",
            error
        })
    }
}