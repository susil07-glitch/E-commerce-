const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    UserEmail: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']         
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
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;  