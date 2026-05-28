
// to replace try and catch ... to handle error //


import { NextFunction,Request,Response } from "express"
import { error } from "node:console"


module.exports =(fn:any)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        fn(req,res,next).catch((err:any)=>{
            return res.status(500).json({
                message:err.message,
                fullError:err
            })
        })

    }

}