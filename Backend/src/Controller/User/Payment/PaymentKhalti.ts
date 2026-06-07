

import { Request,Response } from "express"
import axios from "axios"

export const initilizeKhalti=async(req:Request ,res:Response)=>{
try {

    const {orderId,amount}=req.body
    if(!orderId || !amount){
        res.status(404).json({
            message:"Provide orderid and amount ! "

        })
    }

    const data={
        return_url:'http://localhost:3000',
        purchase_order_id:orderId,
        amount:amount,
        website_url:'http://localhost:3000/',
        purchase_order_name:'OrderName'+orderId
    }

     const khaltiApi =await  axios.post('https://dev.khalti.com/api/v2/epayment/initiate/',data,{
        headers:{
            'Authorization': 'key 6b2d338933514ee897730221ad8a1257',
            "Content-Type":"application/json"
        }
    })
      
    
} catch (error) {
    
}


}