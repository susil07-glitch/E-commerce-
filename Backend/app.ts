import express from 'express';

const app = express();









 // server starter function//
 
const ServerStarter=()=>{
    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    })  
}

ServerStarter();
