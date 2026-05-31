
 import { Response,Request } from "express"
import { AuthRequest } from "../../../types/RequestExtend/userRequestExtend"
import review from "../../Model/reviewModel"
import product from "../../Admin/Product/ProductModel"

 
// to create product review //

 export const createReview=async(req:Request,res:Response)=>{
     try { 
        const UserId = (req as AuthRequest).user.id
        const productId = req.body.productId || (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id)
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
        if(!createdReview){
           return  res.status(401).json({
                message:"Failed to create review"
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
        return res.status(400).json({
            message:"please provide Product id "
        })
    }

    const productExist= await product.findById(productId)
         if(!productExist){
          return res.status(404).json({
            message:`product with ${productId} not found `
          })
         }

     const fetchedReview= await review.find({ ProductId: productId }).populate("UserId")

            res.status(200).json({
            message:"product review fetched successfully",
            data:fetchedReview
        })  
    } catch (error) {
        res.status(500).json({
            message:"something went wrong",
            error: error instanceof Error ? error.message : String(error)
        })
    }
}


// to get my review on the product //

export const getMyReview=async (req:Request,res:Response)=>{
    try {
        const UserId= (req as AuthRequest).user.id 

    const findReview= await review.find({UserId})
     if(!findReview){
        res.status(401).json({
            message:"You haven't made any review ",
            review:[]

        })
     }else{
        res.status(201).json({
            message:"Review fetched secessfully",
            Reviews:findReview
        })
     }
     
    } catch (error :any) {

        res.status(404).json({
            message:error.message
          })
        
    }

}

// to delete product review //

 export const deleteProductReview=async(req:Request,res:Response)=>{
    try {
       const reviewId= req.params.id
       const UserId=(req as AuthRequest).user.id 

       if(!reviewId){
        return res.status(400).json({
            message:"please provide review id "
        })
       }

       const foundReview = await review.findById(reviewId)
       if(!foundReview){
          return res.status(404).json({
            message:"review not found"
          })
       }

       if(String(foundReview.UserId) !== UserId){
            return res.status(403).json({
                message:"you don't have permission to delete this review"
            })
       }

    const deleteReview= await review.findByIdAndDelete(reviewId)
       if(!deleteReview){
        return res.status(401).json({
            message:"failed to delete review"
        })  
       }

        return res.status(200).json({
            message:"Review deleted sucessfully"
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
        const reviewId = req.params.id
        const { Message, Rating } = req.body

        if (!reviewId || !Message || !Rating) {
            return res.status(400).json({
                message: "please provide all fields"
            })
        }

        const existingReview = await review.findById(reviewId)
        if(!existingReview){
            return res.status(404).json({
                message:"review not found"
            })
        }

        if(String(existingReview.UserId) !== UserId){
            return res.status(403).json({
                message:"you don't have permission to update this review"
            })
        }

        const updatedReview = await review.findByIdAndUpdate(reviewId,{
            Message,
            Rating
        }, { new: true })
        if(!updatedReview){
           return  res.status(401).json({
                message:"Failed to update review"
            })
        }

         return res.status(200).json({
            message: "review updated successfully",
            review: updatedReview
        })
    } catch (error) {
        return res.status(500).json({
            message: "failed to update review",
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