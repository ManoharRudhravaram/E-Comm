import jwt from 'jsonwebtoken';
import usersModal from '../model/usersModal.js';

//function to access dashboard with token
export let isRequire = async (req, res, next) => {
    try {
        let decode = jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
        req.user = decode;
        if (!decode) {
            res.status(200).send({ message: "Unauthorized User" })
        }
        next()
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: "user is not authorized" })
    }
    req.headers.authorization
}

//to access admin functionality
export let isAdmin = async (req, res, next) => {
    let userData = await usersModal.findById({ _id: req.user._id })
    if (userData.role == true) {
        next()
    }
    else {
        return res.status(200).send({ message: "User is not Autherized" })
    }
}