import mongoose, { Schema } from "mongoose";
const chatSchema=new Schema({
    content:{
        type:String,
        required:true,
    },
    response:{
        type:String,
        required:true
    }
},{timestamps:true})
export const Chat=mongoose.model("Chat",chatSchema)