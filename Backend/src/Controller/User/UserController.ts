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

      const otp= Math.floor(100000 + Math.random() * 900000).toString();
      isMatched[0].otp=otp
      await isMatched[0].save();
      
      // to send email to register gmail //


      sendEmail({
        email:Email,
        subject: "Password reset OTP",
        text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`
      });
      
      return res.status(200).json({
        message: "OTP sent to email successfully"
      }); 

    
      

    
  }
   catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}


// Verify OTP //

export const VerifyOTP = async (req: Request, res: Response) => {
  try{
    const {Email,otp}=req.body;
    
    if (!Email || !otp){
      return res.status(400).json({
         message: "Email and OTP are required" 
        });  
    }

    // to check the opt is correct or not //
    const isCorrect = await User.findOne({Email});

    if(!isCorrect){
      return res.status(400).json({
        message: "Invalid OTP or email"
      });
    }

    if(isCorrect[0].otp !== otp){
      return res.status(400).json({
        message: "Invalid OTP "
      });
    }else{
      // to despost the opt once used so that it cannot be used again //
      isCorrect[0].otp=undefined
       await isCorrect[0].save();

      return res.status(200).json({
        message : "opt is correct /matched "

      })
    }


  }catch (error) {    
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  } 

}

// to reset password//

export const ResetPassword = async (req: Request, res: Response) => {
  try{
    const {Email,newPassword,ConformPassword}=req.body;
    if (!Email || !newPassword || !ConformPassword){
      return res.status(400).json({
         message: "Email, new password and confirm password are required" 
        });  
    }
    if(newPassword !==ConformPassword){
      return res.status(400).json({
        message:"New password and confirm password do not match"
      })
    }

    const userExist= await User.findOne({Email});
     if (!userExist){
      return res.status(400).json({
        message :"User not found with this email"
      })

  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(newPassword, salt);
    userExist.password=hashedPassword;
    await userExist.save();

    return res.status(200).json({
      message: "Password reset successfully"
    });     
  }

  }catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  } 
}