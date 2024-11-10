import mongoose from "mongoose";

//user schema for db 
let userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true   
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    role:{
        type:Boolean,
        default:0
    },
    answer:{
        type:String,
        require:true
    }
},{timestamps:true})

export default mongoose.model('users',userSchema)