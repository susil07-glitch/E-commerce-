
 import { Response,Request } from "express"
import { AuthRequest } from "../../types/RequestExtend/userRequestExtend"
import review from "../Model/reviewModel"
import product from "../Admin/Product/ProductModel"

 
// to create product review //

 export const createReview=async(req:Request,res:Response)=>{
     try { 
        const UserId = (req as AuthRequest).user.id
        const { Message, Rating } = req.body

        if (!Message || !Rating) {
            return res.status(400).json({
                message: "please provide all fields"
            })
        }

        const createdReview = await review.create({
            UserId,
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
       const productId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
          if(!productId){
        return res.status(401).json({
            message:"please provide Product id "

        })
    }

    const productExist= await product.findById(productId)
         if(!productExist){
          return res.status(401).json({
            message:`product with ${productId} not found `
          })
         }

     const fetchedReview= await review.find({productId}).populate("UserId")

            res.status(201).json({
            message:"product review featched seccussfully ",
            data:fetchedReview
        })

    }
    catch (error) {
        res.status(404).json({
            message:"something went wrong "

        })  
    }
}


// to delete product review //

 export const deleteProductReview=async(req:Request,res:Response)=>{
    try {
       const reviewId= req.params.id
          if(!reviewId){
        return res.status(401).json({
            message:"please provide Product id "

        })
    }

    const deleteReview= await review.findByIdAndDelete(reviewId)
       if(!deleteReview){
        return res.status(401).json({
            message:"failed to delete review"

        })  
       }


        await res.status(401).json({
            message:"Review deleted succefully "

        })


    }
    catch (error) {
        res.status(404).json({
            message:"something went wrong "

        })  
    }
}


// update review //


export const updateReview=async(req:Request,res:Response)=>{
     try { 
        const UserId = (req as AuthRequest).user.id
        const productId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
        const reviewId =req.params.id
        const { Message, Rating } = req.body

        if (!productId || !Message || !Rating) {
            return res.status(400).json({
                message: "please provide all fields"
            })
        }

        const createdReview = await review.findByIdAndUpdate(reviewId,{
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


// to get single review //

//  export const getSingleReview=async(req:Request,res:Response)=>{
//     try {
//       const reviewId =req.params.id
//           if(!reviewId){
//         return res.status(401).json({
//             message:"please provide Product id "

//         })
//     }

//     // const productExist= await product.findById(reviewId)
//     //      if(!productExist){
//     //       return res.status(401).json({
//     //         message:`product with ${reviewId} not found `
//     //       })
//     //      }

//      const fetchedReview= await review.findOne({reviewId})
//             res.status(201).json({
//             message:"product review featched seccussfully ",
//             data:fetchedReview
//         })

//     }
//     catch (error) {
//         res.status(404).json({
//             message:"something went wrong "

//         })  
//     }
// }