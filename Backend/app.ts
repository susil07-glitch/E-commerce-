import express from 'express';
import Userroutes from './src/Controller/Auth/AuthRoutes'
import connectDB from './src/Database/database';
import Productroutes from './src/Controller/Admin/Product/ProductRoutes';
import logedUserRoutes from './src/Controller/Admin/LogedInUser/logedUserRoutes'
import profileroutes from './src/Controller/User/Routes/ProfileRoutes/ProfileRoutes'
import cartRoutes from './src/Controller/User/Routes/CartRoutes/CartRoutes'
import orderRoutes from './src/Controller/User/Routes/OrderRoutes/OrderRoutes';


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// database connection //

connectDB();    

// Routing all the  Routes //
app.use('/auth/api',Userroutes)
app.use('/product/api',Productroutes);
app.use('/adminUser/api',logedUserRoutes);
app.use('/user/api',profileroutes);
app.use('/user/api',cartRoutes);
app.use('/order/api',orderRoutes);






// telling node to accsee the upload folder//
app.use((express.static("uploads")));



 // server starter function//
 
const ServerStarter=()=>{
    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    })  
}

ServerStarter();
