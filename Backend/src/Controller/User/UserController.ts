import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import envConfig from "../../Config/Config";

import User from "./UserModel";
import sendEmail from "../../../Services/SendEmail";
const jwt = require('jsonwebtoken');

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { Email, UserPhoneNumber, password, UserName } = req.body;

    if (!Email || !UserPhoneNumber || !password || !UserName) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ Email }, { UserPhoneNumber }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or phone number already in use" });
    }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hashSync(password, salt);


    const newuser = await User .create({
      Email: Email,
      UserPhoneNumber: UserPhoneNumber,
      password: hashedPassword,
      UserName: UserName,
    });

    res.status(201).json({
      message: "User registered successfully",
      data: newuser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};



// login user controller //

export const LoginUser = async (req: Request, res: Response) => {
  try {
    const { Email, password } = req.body;

    if (!Email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const UserFound = await User.findOne({ Email });

    if (!UserFound) {
      return res
        .status(400)
        .json({ message: "Invalid email or password" });
    }

    // FIXED: no [0]
    const isMatch = await bcrypt.compare(password, UserFound.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: UserFound._id },
      envConfig.jwtSecret,
      { expiresIn: "30d" }
    );

    return res.status(200).json({
      message: "Login successful",
      data: UserFound,
      token,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}; 


// Forget password//

export const ForgetPassword = async (req: Request, res: Response) => {
  try {
    const {Email} = req.body;

    if (!Email){
      return res.status(400).json({
         message: "Email is required" 
        });  
    }
     const isMatched = await User.findOne({Email});
  // if the email is register or not //

     if(!isMatched){
      return res.status(400).json({
        message: "User not found with this email"
      });
     }

      // send otp to that email //

      const opt= Math.floor(100000 + Math.random() * 900000).toString();
      console.log(opt);
      
      // here we can send the otp to the user email using nodemailer or any other service //

      sendEmail({
        email:Email,
        subject: "Password reset OTP",
        text: `Your OTP for password reset is ${opt}. It is valid for 10 minutes.`
      });
      
      return res.status(200).json({
        message: "OTP sent to email successfully"
      }); 

      // to reset the password //
      

    
  }
   catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}