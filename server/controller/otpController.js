import mailGenerator from "../config/mailGen.js";
import transporter from "../config/nodeMailer.js";
import otpModal from "../model/otpModal.js";
import usersModal from "../model/usersModal.js";
import { randomInt } from 'crypto';
import jwt from "jsonwebtoken";

//generation of otp
export let otpGenerateController = async (req, res) => {
    try {
        let { email } = req.body;
        let existingUser = await usersModal.findOne({ email });
        if (existingUser) {
            let existingOtp = await otpModal.findOne({ email });
            if (existingOtp) {
                return res.status(200).send({ msg: "wait for a while", success: false });
            }
            else {
                let otp = randomInt(1000, 10000);
                await new otpModal({ otp, email, user: existingUser._id }).save();
                let response = {
                    body: {
                        name: existingUser.name,
                        intro: "This is for OTP login",
                        table: {
                            data: [
                                {
                                    title: "Your 4 digit OTP is",
                                    otp,
                                },
                            ],
                        },
                        outro: "Looking forward to do more business",
                    }
                }
                let mail = mailGenerator.generate(response);
                let message = {
                    from: process.env.USER,
                    to: existingUser.email,
                    subject: "otp",
                    html: mail,
                }
                transporter.sendMail(message).then(() => {
                    return res.status(200).send({ msg: "OTP sent to registered mail", success: true })
                }).catch((err) => {
                    return res.status(500).send({ msg: "something wrong", err, success: false })
                })
            }
        }
        else {
            return res.status(200).send({ msg: "Invalid User", success: false })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Something Wrong", error, success: false })
    }
}

//validate otp
export let otpValidateController = async (req, res) => {
    try {
        let { email, otp } = req.body;
        let verifyOtp = await otpModal.findOne({ otp }).populate('user');
        if (verifyOtp) {
            let token = jwt.sign(
                { _id: verifyOtp.user.id },
                process.env.SECRET_KEY
            );
            return res.status(200).send({
                msg: "login successfull", success: true, user: {
                    name: verifyOtp.user.name,
                    email: verifyOtp.user.email,
                    phone: verifyOtp.user.phone,
                    address: verifyOtp.user.address,
                    role: verifyOtp.user.role,
                },token
            })
        }
        else{
            return res.status(200).send({ message: "Otp Incorrect", success: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Something Wrong while validating", error, success: false })

    }
}