
 import { Response,Request } from "express"
import { AuthRequest } from "../../types/RequestExtend/userRequestExtend"
import review from "../Model/reviewModel"
import product from "../Admin/Product/ProductModel"

 
// to create product review //

 export const createReview=async(req:Request,res:Response)=>{
     try { 
        const UserId = (req as AuthRequest).user.id
        const productId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
        const { Message, Rating } = req.body

        if (!productId || !Message || !Rating) {
            return res.status(400).json({
                message: "please provide all fields"
            })
        }

        const createdReview = await review.create({
            UserId,
            ProductId: productId,
            Message,
            Rating
        })
        if(!createReview){
           return  res.status(401).json({
                message:"Filed to create review "
            })
        }

         return res.status(201).json({
            message: "review created successfully",
            review: createdReview
        })
    } catch (error) {
        return res.status(500).json({
            message: "failed to create review",
            error: error instanceof Error ? error.message : String(error)
        })
    }
}

// to get all product review//

 export const getProductReview=async(req:Request,res:Response)=>{
    try {
        const productId =Array.isArray(req.params.id)?req.params.id[0]:req.params.id

          if(!productId){
        return res.status(401).json({
            message:"please provide Product id "

        })

        const productExist= await product.findById(productId)
        if(!productExist){
            res
        }
    }
        
    } catch (error) {
        
    }


 }
