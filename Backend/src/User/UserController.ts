import { Request, Response } from "express";
import { User } from "./UserTypes";

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

    const user = await User.create({
      UserEmail: UserEmail,
      UserPhoneNumber: UserPhoneNumber,
      password: password,
      UserName: UserName,
    });

    res.status(201).json({
      message: "User registered successfully",
      data: user,
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

    const user = await User.findOne({ UserEmail });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};
