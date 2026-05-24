import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "./UserModel";

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { UserEmail, UserPhoneNumber, password, UserName } = req.body;

    if (!UserEmail || !UserPhoneNumber || !password || !UserName) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ UserEmail }, { UserPhoneNumber }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or phone number already in use" });
    }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hashSync(password, salt);


    const newuser = await User .create({
      UserEmail: UserEmail,
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
    const { UserEmail, password } = req.body;

    if (!UserEmail || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const newuser = await User.findOne({ UserEmail });
    if (!newuser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, newuser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      data: newuser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};
