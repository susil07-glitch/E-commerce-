
import mongoose, { Schema } from "mongoose";

const reviewSchema= new Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"userId must belongs to User"]
    },
    ProductId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:[true,"productId must belong to a product"]
    },
    Rating:{
        type:Number,
        required:true,
        default:3
    },
    Message:{
        type:String,
        required:true
    }
})


const review = mongoose.model("userReview",reviewSchema)

export default review;
