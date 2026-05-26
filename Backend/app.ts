import express from 'express';
import Userroutes from './src/Controller/User/UserRoutes';
import connectDB from './src/Database/database';
import Productroutes from './src/Controller/Admin/Product/ProductRoutes';

const app = express();






app.use(express.json());

// database connection //

connectDB();    

// auth routes //
app.use('/auth/api',Userroutes);
app.use('/product/api',Productroutes);


 // server starter function//
 
const ServerStarter=()=>{
    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    })  
}

ServerStarter();
