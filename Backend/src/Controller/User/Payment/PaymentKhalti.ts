

import { Request,Response } from "express"
import axios from "axios"
import OrderModel from "../../Model/OrderModel"

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
      
    res.redirect(khaltiApi.data.payment_url)
    
} catch (error) {
    
}


}



export const VerifyPidx=async(req:Request,res:Response)=>{
    try {
        const pidx=req.query.pidx
      const response=  await axios.post("https://dev.khalti.com/api/v2/epayment/lookup/",{pidx },{
        headers:{
            "Authorization":'key 6b2d338933514ee897730221ad8a1257'
        }
     } )

     if(response.data.status =='Completed'){
     // database ma modification garne//

    const order= await OrderModel.find({'paymentDetails.pidx': pidx})

    //    order[0].paymentDetails.status='paid'
      // order[0].paymentDetails.method='khalti'

    //   order.save()



     }
     
     


    } catch (error) {
        
    }

}

