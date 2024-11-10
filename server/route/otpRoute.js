import express from 'express';
import { otpGenerateController, otpValidateController } from '../controller/otpController.js';
let route=express.Router();

//generate otp || POST
route.post('/otp',otpGenerateController)

//validate otp||POST
route.post('/otp/validate',otpValidateController)
export default route;