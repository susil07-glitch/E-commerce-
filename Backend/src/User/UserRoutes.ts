
import { storage,multer } from "../MiddleWare/multerConfig";
import { RegisterUser } from "./UserController";


const express = require('express');

const Userroutes= express.Router();

const upload = multer({ storage: storage });




Userroutes.route('/register/api').post (upload.single('file'), RegisterUser);
 export default Userroutes;