
import mongoose, { Schema } from "mongoose";

const reviewSchema= new Schema({
    UserId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:[true,"userId must belongs to User"]
    },
    ProductId:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:[true,"Productid must belongs to porduct"]
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
