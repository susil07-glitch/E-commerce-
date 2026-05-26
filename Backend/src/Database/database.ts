import mongoose from "mongoose";
import envConfig from "../Config/Config";
import User from "../Controller/User/UserModel";
import bcrypt from "bcryptjs";

const connectDB = async () => {
  try {

    await mongoose.connect(envConfig.mongodbUrl as string, {
      connectTimeoutMS: 5000,
    });

    console.log("MongoDB connected successfully");

    // check admin
    const isAdminExist = await User.findOne({
      Email: "admin@gmail.com",
    });

    if (!isAdminExist) {

      // hash password
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(
        "admin123",
        salt
      );

      // create admin
      await User.create({
        Email: "admin@gmail.com",
        UserPhoneNumber: "1234567890",
        password: hashedPassword,
        UserName: "Admin",
        role: "admin",
      });

      console.log("Admin seeded successfully");

    } else {
      console.log("Admin already exists");
    }

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;