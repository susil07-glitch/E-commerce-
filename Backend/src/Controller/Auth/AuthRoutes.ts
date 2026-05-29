

import { ForgetPassword, LoginUser, RegisterUser } from "./AuthController";


const express = require('express');

const Userroutes= express.Router();





Userroutes.route('/register').post (RegisterUser);
Userroutes.route('/login').post (LoginUser);
Userroutes.route('/forgetpassword').post(ForgetPassword);

 export default Userroutes;