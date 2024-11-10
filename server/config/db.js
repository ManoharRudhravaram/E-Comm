import mongoose from 'mongoose';

//db connection
let DbConnect=async()=>{
    try{
        let connection=await mongoose.connect(process.env.DBURI);
        console.log("db connected");
    }
    catch(err){
        console.log(err);
    }
}

export default DbConnect;