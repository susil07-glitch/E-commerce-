import { AuthRequest } from "../../../types/RequestExtend/userRequestExtend"
import { Request,Response } from "express"
import product from "../../Admin/Product/ProductModel"
import User from "../../Auth/AuthModel"




export const addToCart= async (req:Request,res:Response)=>{
    try {

        const userId= (req as AuthRequest).user.id 

        const {productId }=req.params

        if(!productId){
            res.status(401).json({
                message:"please provide productId "

            })
        }

        const ProductExist = await product.findById(productId)
        if(!ProductExist){
            res.status(401).json({
                message:"product doesn't Exist  "

            })
        }

        const user = await User.findById(userId)

        user.Cart.push(productId)
        await user.save()
        res.status(201).json({
                message:"Product added to cart   "

            })

        
    } catch (error :any) {

         res.status(201).json({
                message:error.message

            })
        
    }
}