import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import DbConnect from './config/db.js';
import cors from 'cors';
import authRoute from './route/authRoute.js';
import categoryRoute from './route/categoryRoute.js'
import productRoute from './route/productRoute.js';
import orderRoute from './route/orderRoute.js';
import otpRoute from './route/otpRoute.js';
//creating server
const app = express();

//.evn configuration
dotenv.config()  

//cross origin resource sharing to connect front end
app.use(cors())

//to handle json data
app.use(express.json());

//middle ware to log requests
app.use(morgan('dev'))


let PORT = process.env.PORT || 8080;

//mongo db connection
DbConnect()

//testing 
app.get('/', (req, res) => {
    res.send(`test`)
})

//auth route
app.use('/api/v1',authRoute);

//category route
app.use('/api/v1',categoryRoute);

//product route
app.use('/api/v1',productRoute)

//order route
app.use('/api/v1',orderRoute);

//otp route
app.use('/api/v1',otpRoute);

//server
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
})