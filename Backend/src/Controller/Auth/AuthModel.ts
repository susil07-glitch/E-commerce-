const mongoose = require('mongoose');
import { Schema } from "mongoose";
import { UserTypes } from "./AuthTypes";

const userSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercse:true
        
        
    },
    UserPhoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true
    },
    UserName: {
        type: String,
        required: [true, 'User name is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select:false
    },
    role:{
        type:String,
        enum:['admin','customer'],
        default:'customer'
    },
    opt:{
        type :Number
    },
    cart:[
        {
            type:Schema.Types.ObjectId ,
            ref:"product"
        }
        ]
        
},{
    timestamps:true
});

const User = mongoose.model('User', userSchema);

export default User;