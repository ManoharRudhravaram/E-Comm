import express from "express";
import { getAllUsers, loginController, profileUpdateController, registerControl, resetPassword, sellerRegisterController, sellerSigninController } from "../controller/authController.js";
import { isAdmin, isRequire } from "../MiddleWare/authMiddleware.js";
import { changeRoleController } from "../controller/authController.js";
let route = express.Router()

//route for registration
route.post('/register', registerControl);

//route for login
route.post('/login', loginController);

//seller registration
route.post('/seller_register',sellerRegisterController)

//seller signin
route.post('/seller_signin',sellerSigninController)

//route for password reset
route.post('/reset-password', resetPassword)

//route for dashboard access
route.get('/auth-user', isRequire, (req, res) => {
    res.send({ ok: true })
})

//route for admin dashboard access
route.get('/admin-auth-route', isRequire, isAdmin, (req, res) => {
    res.send({ ok: true })
})

//update user || put
route.put('/profile-update', isRequire, profileUpdateController)

//get all users
route.get('/allusers',isRequire,isAdmin,getAllUsers)

//change user role
route.post('/editUsers/:id',isRequire,isAdmin,changeRoleController)
export default route;