
import mongoose from "mongoose";
import review from "../../Model/reviewModel";

const productSchema= new mongoose.Schema({
ProductName:{
    type:String,
    required:[true,"Product name is required"],
},
Description:{
    type:String,
    required:[true,"Product description is required"],
},
Price:{
    type:Number,
    required:[true,"Product price is required"],
},
Category:{
    type:String,
    required:[true,"Product category is required"],
},
ProductStockQty:
{
    type:Number,
    required:[true,"Product stock quantity is required"]            
},
ProductStatus:{
    type:String,
    enum:["available","out of stock"],
    default:"available"
},
ProductImage:{
    type:String

},
reviews:{review},

ProductCreatedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
}


},{
    timestamps:true

});



const product=mongoose.model("Product",productSchema);
export default product;
