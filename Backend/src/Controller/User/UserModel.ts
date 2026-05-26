const mongoose = require('mongoose');
import { UserTypes } from "./UserTypes";

const userSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
        
        
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
        required: [true, 'Password is required']
    },
    role:{
        type:String,
        enum:['admin','customer'],
        default:'customer'
    },
    opt:{
        type :Number
    }
},{
    timestamps:true
});

const User = mongoose.model('User', userSchema);

export default User;