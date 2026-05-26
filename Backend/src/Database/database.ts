import mongoose from "mongoose";
import envConfig from "../Config/Config";
import adminSeeder from "../AdminSeeder/adminSeeder";


const connectDB = async () => {
  try {

    await mongoose.connect(envConfig.mongodbUrl as string, {
      connectTimeoutMS: 5000,
    });

    console.log("MongoDB connected successfully");
    

    //Check admin user//
   adminSeeder();


  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;