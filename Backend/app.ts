import express from 'express';
import Userroutes from './src/User/UserRoutes';
import connectDB from './src/Database/database';

const app = express();






app.use(express.json());

// database connection //

connectDB();    

// auth routes //
app.use('/auth/api',Userroutes);



 // server starter function//
 
const ServerStarter=()=>{
    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    })  
}

ServerStarter();
