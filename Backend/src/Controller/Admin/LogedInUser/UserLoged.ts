import { Request, Response } from "express";
import User from "../../Auth/AuthModel";


export const userLoged = async (
  req: Request,
  res: Response
)=> {
  try {

    // Fetch all users except admin
    const users = await User.find({
      role:{$ne :"admin"}

    }).select("-__v");

    // Check if users exist

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users available",
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      totalUsers: users.length,
      data: users,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });

  }
};


// to find all admin in the system //

 export const adminFeatch=async(req:Request,res:Response)=>{
    try{
        const isAdmin=await User.find({
           role:"admin"
        }).select("-__v")

        if(!isAdmin){
            return res.status(401).json({
                success:false,
                message:"no admin found"
            })

        }

        return res.status(201).json({
            success:true,
            message:"Admin featched seccussfully ",
            data:isAdmin
        })



    }catch(error){
        res.status(404).json({
            message:"something went wrong"
        })

    }
}

//  to delete the user //

export const deleteUser=async(req:Request,res:Response)=>{
  try {
    const userId=req.params.id

    if(!userId){
      return res.status(401).json({
        message:"please provide user id  "

      })
    }

    const findUserId= await User.findById(userId)
        if(!findUserId){
          return res.status(401).json({
            message:"User Not Found"
          })
        }else{
           await User.findByIdAndDelete(userId)
           res.status(201).json({
            message:"User deleted suyccessfull"

           })

        }

  } catch (error) {
    res.status(404).json({
      message:"something went wrong "
    })
    
  }

}



