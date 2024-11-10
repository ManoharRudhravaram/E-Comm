import mongoose from "mongoose";

//user schema for db 
let sellerSchema=new mongoose.Schema({
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
    store:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    gst:{
        type:String,
        require:true
    }
},{timestamps:true})

export default mongoose.model('sellers',sellerSchema)