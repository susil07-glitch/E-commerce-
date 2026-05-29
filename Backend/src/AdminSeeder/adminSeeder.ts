 

const bcrypt = require("bcryptjs");

import User from "../Controller/Auth/AuthModel";


const adminSeeder=async()=>{
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
    

}

export default adminSeeder;
