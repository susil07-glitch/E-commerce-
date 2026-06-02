
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