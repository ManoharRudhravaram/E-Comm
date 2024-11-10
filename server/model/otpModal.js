import mongoose from "mongoose";

let otpModal=new mongoose.Schema({
    email:String,
    otp:Number,
    user:{
        type:mongoose.ObjectId,
        ref:"users",
    }
    ,createdAt:{type:Date,expires:60,default:Date.now}
})

export default mongoose.model('otpModal',otpModal);