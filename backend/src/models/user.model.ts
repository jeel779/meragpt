import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    chatHistory:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Chat"
        }
    ]
},{timestamps:true})
export const User=mongoose.model('User',userSchema); 