

import { Request,Response } from "express"
import { AuthRequest } from "../../../types/RequestExtend/userRequestExtend"
import User from "../../Auth/AuthModel"
import bcrypt, { hashSync } from "bcryptjs";



// to get my profile//

export const getMyProfile=async(req:Request,res:Response)=>{
    try {
        const userId=(req as AuthRequest).user.id
        const myProfile= await User.findById(userId)
        if(!userId){
            return res.status(401).json({
                message:"please provide User id "
            })
        } 
        
        if(!myProfile){
            return res.status(404).json({
                message:"No profile with that id found "

            })
        }
         // to featched profile //

         res.status(201).json({
            message:"profile fetached secessfully ",
            data:myProfile
         })

    } catch (error :any) {

        res.status(404).json({
            message:error.message

        })   
    }
}

// to update profile //

export const updateMyProfile=async(req:Request,res:Response)=>{
    try {
        const userId=(req as AuthRequest).user.id
        const {Email,UserName,UserPhoneNumber}=req.body

        if(!userId){
            return res.status(401).json({
                message:"please provide User id "
            })
        } 
        
        if(!Email || !UserName || !UserPhoneNumber){
            return res.status(404).json({
                message:"please provide Email,UserName,UserPhoneNumber  "

            })
        }
         // to update  profile //

         const updateProfile= await User.findByIdAndUpdate(userId,{
            Email,
            UserName,
            UserPhoneNumber
         })


        if(!updateProfile){
            return res.status(401).json({
                message:"failed to update profile  "
            })
        } else {

            return res.status(201).json({
                message:"profile Updated secessfully  "
            })
            
        }
    } catch (error :any) {

        res.status(404).json({
            message:error.message

        })   
    }
}


// to delete profile //


export const deleteMyProfile=async(req:Request,res:Response)=>{
    try {
        const userId=(req as AuthRequest).user.id
        const deleteProfile= await User.findByIdAndDelete(userId)
        if(deleteProfile){
            return res.status(401).json({
                message:"Profile deleted "
            })
        } 

    } catch (error :any) {

        res.status(404).json({
            message:error.message

        })   
    }
}


// to update password //



export const UpdateProfilePasssword=async(req:Request,res:Response)=>{

    try {

        const userId =(req as AuthRequest).user.id
        const {oldPassword ,newPassword,confirmPassword}=req.body 

         if(!oldPassword || !newPassword || !confirmPassword){
            return res.status(401).json({
                message:"All field are required !"
            })
         }

         if(newPassword !== confirmPassword){
            return res.status(401).json({
                message:" NewPassword and ConfirmPassword doesn't matched "
            })

         }

         const userData= await User.findById(userId)

         const hashedOldPassword= userData.password

         const isOldPasswordCorrect= bcrypt.compareSync(oldPassword,hashedOldPassword)

         if(!isOldPasswordCorrect){
           return res.status(401).json({
              message:"password doesn't matched"
            })
         }
           
         
         userData.password= hashSync(newPassword,12)
         await userData.save()

            res.status(201).json({
                message:" passwaord changed successfully"
            })
       



    } catch (error : any) {

        res.status(404).json({
            message:error.message
        })
        
    }
   
}

