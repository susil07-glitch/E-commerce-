
import mongoose from "mongoose";

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
}


},{
    timestamps:true

});



const product=mongoose.model("Product",productSchema);
export default product;
