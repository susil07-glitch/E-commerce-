import express from "express";
import Userroutes from "./src/Controller/Auth/AuthRoutes";
import connectDB from "./src/Database/database";
import Productroutes from "./src/Controller/Admin/Product/ProductRoutes";
import logedUserRoutes from "./src/Controller/Admin/LogedInUser/logedUserRoutes";
import profileroutes from "./src/Controller/User/Routes/ProfileRoutes/ProfileRoutes";
import cartRoutes from "./src/Controller/User/Routes/CartRoutes/CartRoutes";
import orderRoutes from "./src/Controller/User/Routes/OrderRoutes/OrderRoutes";
import paymentRoutes from "./src/Controller/User/Routes/PaymentRoutes";
import http from "http";
import User from "./src/Controller/Auth/AuthModel";
const {Server} = require("socket.io");

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connection //

connectDB();

// Routing all the  Routes //
app.use("/auth/api", Userroutes);
app.use("/product/api", Productroutes);
app.use("/adminUser/api", logedUserRoutes);
app.use("/user/api", profileroutes);
app.use("/user/api", cartRoutes);
app.use("/order/api", orderRoutes);
app.use("/user/api/payment", paymentRoutes);

// telling node to accsee the upload folder//
app.use(express.static("uploads"));

// server starter function//
const ServerStarter = () => {
  server.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

// socket connection //

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: any) => {
  console.log("A User Connected");
   socket.on('register',async(data :any)=>{
     const {email ,UserName,UserPhoneNumber,password}=data

      await User.create({
        UserName:UserName,
        UserPhoneNumber:UserPhoneNumber,
        Email:email,
        password:password
      })
      socket.emit('response',{message:"User Registered "})
      console.log(data);

   })

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

ServerStarter();



export const getSocketIo=()=>{
    return io;
    
}


