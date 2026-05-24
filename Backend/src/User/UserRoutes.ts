
import { storage,multer } from "../MiddleWare/multerConfig";
import { LoginUser, RegisterUser } from "./UserController";


const express = require('express');

const Userroutes= express.Router();

const upload = multer({ storage: storage });




Userroutes.route('/register').post (RegisterUser);
Userroutes.route('/login').post (LoginUser);
 export default Userroutes;