import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');    
import envConfig from "../Config/Config";
import { promisify } from "node:util";
import User from "../Controller/Auth/AuthModel";
import { AuthRequest } from "../types/RequestExtend/userRequestExtend";



const isAuthenticated = async(req: Request, res: Response, next: NextFunction ) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "please login to access this resource ",
      });
    }

    // jwt.verify(token, envConfig.jwtSecret as string, (err: any, decoded: any) => {
    //   if (err) {
    //     return res.status(401).json({
    //       message: "Invalid token",
    //     });
    //   }
    //   (req as any).user = decoded;


    // another way to verify token using promisify//


 const decoded = await promisify(jwt.verify)(token, envConfig.jwtSecret);
    if(!decoded){
        return res.status(401).json({
            message: "Invalid token",
        });
    }

    const  doesUserExist = await User.findOne({_id:decoded.id});
    if(!doesUserExist){
        return res.status(401).json({
            message:"Unauthorized User "
        })
    }
    
   (req as AuthRequest).user =doesUserExist;

   next();


  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export default isAuthenticated;