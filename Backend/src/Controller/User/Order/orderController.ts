
import { Request, Response } from "express";        
import { AuthRequest } from "../../../types/RequestExtend/userRequestExtend";
import OrderModel from "../../Model/OrderModel";


// to crete order by User //

export const createOrder=async (req:Request,res:Response)=>{
    try {
        const userId=(req as AuthRequest).user._id;
        const {items,totalAmount,ShippingAddress,PaymentDetails}=req.body;

        if(!items || !totalAmount || !ShippingAddress || !PaymentDetails){
            return res.status(400).json({message:"All fields are required"});
        }

        // Create the order in the database
        const newOrder = await OrderModel.create({
            Userid:userId,
            items,
            totalAmount,
            ShippingAddress,
            PaymentDetails
        });

        return res.status(201).json({
            message:"Order created successfully", 
            order: newOrder});

    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({message:"Internal server error"});
    }
} 


// to get all orders of User //

export const getMyOrders=async (req:Request,res:Response)=>{
    try {
        const userId=(req as AuthRequest).user._id;

        const orders=await OrderModel.find({Userid:userId}).populate({
            path: "items.Product",
            model:"Product",
            select:"-__v -createdAt -updatedAt  -description"

        });

        return res.status(200).json({
            message:"Orders fetched successfully",
            Orders:orders

        
        });

    } catch (error) {

        console.error("Error fetching orders:", error);
        return res.status(500).json({
            message:"Internal server error"
        });
    }
}   


// to update order by user before it is shipped or delivered //

export const updateMyOrder=async (req:Request,res:Response)=>{
    try {
        const userId=(req as AuthRequest).user._id;
        const orderId=req.params
        
        if(!orderId){
            return res.status(400).json({
                message:"Order ID is required"
            });
        }


        const orderExist =await OrderModel.findOne({_id:orderId,Userid:userId});

        if(!orderExist){
            return res.status(404).json({
                message:"Order not found"
            });
        }

        if(orderExist.OrderStuatus==="Shipped" || orderExist.OrderStuatus==="Delivered"){
            return res.status(400).json({
                message:"Order cannot be updated as it is already shipped or delivered"
            });
        }

         const updateOrder =await OrderModel.findByIdAndUpdate({orderId});
         if(!updateOrder){
            return res.status(404).json({
                message:"Failed to update Order"
            })

         }

         return res.status(200).json({
            message:"Order updated successfully",

            data:updateOrder

         });


       

    } catch (error) {
        console.error("Error updating order:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}



// to cancel order by user before it is shipped or delivered //

export const cancelMyOrder=async (req:Request,res:Response)=>{
    try {
        const userId=(req as AuthRequest).user._id;
        const orderId=req.params
        
        if(!orderId){
            return res.status(400).json({
                message:"Order ID is required"
            });
        }

        const orderExist =await OrderModel.findOne({_id:orderId,Userid:userId});

        if(!orderExist){
            return res.status(404).json({
                message:"Order not found"
            });
        }

        if(orderExist.OrderStuatus==="Shipped" || orderExist.OrderStuatus==="Delivered"){
            return res.status(400).json({
                message:"Order cannot be cancelled as it is already shipped or delivered"
            });
        }

         const cancelOrder =await OrderModel.findByIdAndUpdate({
            orderId},{OrderStuatus:"cancelled"});
         if(!cancelOrder){
            return res.status(404).json({
                message:"Failed to cancel Order"
            })

         }

         return res.status(200).json({
            message:"Order cancelled successfully",
        });
        
        

        
    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
        });

        
    }
}



   // to delete my order//


export const deleteMyOrder=async (req:Request,res:Response)=>{
    try {
        const userId=(req as AuthRequest).user._id;
        const orderId=req.params
        
        if(!orderId){
            return res.status(400).json({
                message:"Order ID is required"
            });
        }

        const orderExist =await OrderModel.findById({_id:orderId,Userid:userId});

        if(!orderExist){
            return res.status(404).json({
                message:"Order not found"
            });
        }


         const cancelOrder =await OrderModel.findByIdAndDelete(orderId)
            return res.status(404).json({
                message:"Failed to cancel Order"
            })


    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
        }); 
    }
}


// to get single Order//


export const getSingleOrder=async (req:Request,res:Response)=>{
    try {
        const orderId=req.params
        
        if(!orderId){
            return res.status(400).json({
                message:"Order ID is required"
            });
        }

        const orderExist =await OrderModel.findOne({_id:orderId});

        if(!orderExist){
            return res.status(404).json({
                message:"Order not found"
            });
        }

        const getOrder= await OrderModel.find(orderId)

         return res.status(200).json({
            message:"Order fetched successfully",
        });
        
    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
        });

        
    }
}

