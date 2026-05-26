
import { NextFunction, Request, Response } from "express";  
import { AuthRequest } from "../types/RequestExtend/userRequestExtend";

const restrictTo = (...roles:String[])=>{
    return (req: Request, res: Response, next: NextFunction)=>{


        console.log(roles);
        console.log((req as AuthRequest).user.role);
        const userRole=(req as AuthRequest).user.role;

       

        // if tthe user role is not admin then it return 403 error //
         

        if(!roles.includes(userRole)){
            return res.status(403).json({
                message:"You do not have permission to access this resource"
            })
        } 
        else{
            next();

        }  
        

   



}



}

export default restrictTo;