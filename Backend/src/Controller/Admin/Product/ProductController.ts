import { Request, Response } from "express";
import Product from "./ProductModel";
import { AuthRequest } from "../../../types/RequestExtend/userRequestExtend";
import { error } from "node:console";
import fs from "fs";


// to create product //

export const createProduct = async (req: Request, res: Response) => {
  try {
    const Image =req.file

    const {
      Name,
      Description,
      Price,
      Category,
      ProductStockQty,
      ProductStatus,
    } = req.body;

    if (
      !Name ||
      !Description ||
      Price === undefined ||
      !Category ||
      ProductStockQty === undefined ||
      !ProductStatus
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newProduct = await Product.create({
      ProductName: Name,
      Description,
      Price: Number(Price),
      Category,
      ProductStockQty: Number(ProductStockQty),
      ProductStatus,
      ProductImage: Image ? Image.originalname : undefined, // Save the file path of the uploaded image
      CreatedBy: (req as AuthRequest).user._id, // which user has created that product //

    });

    return res.status(201).json({
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.messsage || "Server error",
    });
  }
};


// To get all product //

export const getAllProducts= async (req:Request, res:Response)=>{
  try{
    const Products= await Product.find()

    if(!Products){
      return res.status(404).json({
        message:"No product found "

      })
    }
    return res.status(200).json({
      message:"Products featched successfully",
      data:Products
    })

  }catch(error){
    console.error(error);
    res.status(401).json({
      message:"Something went wrong"

    })

  }

}

// to edit the product //
export const editProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      Name,
      Description,
      Price,
      Category,
      ProductStockQty,
      ProductStatus,
    } = req.body;
    if (
      !Name ||
      !Description ||
      Price  ||
      !Category ||
      ProductStockQty  ||
      !ProductStatus
    ) {
      return res.status(400).json({
        message: "All Field are required",
      });

    }
    const updateProduct = await Product.findByIdAndUpdate(id,
      {
      ProductNmae:Name,
      Description,
      Price:Number(Price),
      Category,
      ProductStockQty:Number(ProductStockQty),
      ProductStatus,
      ProductImage:req.file ? req.file.originalname : undefined, // Save the file path of the uploaded image

    },{
      new:true

    })

    if(!updateProduct){
      return res.status(404).json({
        message:"Product not found"

      })
    }else{
      res.status(200).json({
        message:"Product edited successfully "

      })
    }

  } catch (error :any) {
    console.error(error)
    res.status(401).json({
      message:error.message,

    })
  }
};

// to delete Created product //

 export const deleteProduct=async(req:Request,res:Response)=>{
    try {

      const {id}=req.params
      const productToDelete= await Product.findById(id)
      if(!productToDelete){
       return  res.status(401).json({
          message:"product not found"

        })
      }
      const ImageToDelete=productToDelete.ProductImage
      
        if(req.file && req.file.originalname){
          fs.unlink(`./uploads/ + ${ImageToDelete}`,(error)=>{
        if(error){
          console.log(error)
        }
        else{
          res.status(200).json({
            message:"product deleted successfully"
          })
        }

      })

        }
      
       const productDeleted= await Product.findByIdAndDelete(id)
       if(productDeleted){
        return res.status(200).json({
          message:"product deleted successfully"
        })
       
      }

    } catch (error) {
      res.status(401).json({
        message:"Something went wrong"

      })
      
    }
 }


 // single Product featching api //

 export const singleProductFetched=async(req:Request,res:Response)=>{
  try {
    const {id}=req.params
    const singleFeatch= await Product.findById(id)

    if(!singleFeatch){
       return res.status(404).json({
        messge:"product not found"
      })
    }

    return res.status(201).json({
      message:"product found successfully ",
      data:singleFeatch
    })
 
  } catch (error:any) {
    res.status(401).json({
      message:error.message

    })
    
  }
 }

