import { encryptedPassword, matchPassword } from "../helper/authHelper.js";
import sellerModal from "../model/sellerModal.js";
import usersModal from "../model/usersModal.js";
import jwt from "jsonwebtoken";

//registration for user
export let registerControl = async (req, res) => {
    let { email, password, name, phone, address, answer } = req.body;
    try {
        if (!email) {
            return res.status(500).send({ msg: 'email is required' })
        } if (!password) {
            return res.status(500).send({ msg: 'password is required' })
        } if (!name) {
            return res.status(500).send({ msg: 'name is required' })
        } if (!phone) {
            return res.status(500).send({ msg: 'phone is required' })
        } if (!address) {
            return res.status(500).send({ msg: 'address is required' })
        } if (!answer) {
            return res.status(500).send({ msg: 'answer is required' })
        }

        let findUser = await usersModal.findOne({ email: email })
        if (findUser) {
            return res.status(200).send({ msg: 'user is already resgistered' })
        }
        let hashpassword = await encryptedPassword(password);
        let user = await new usersModal({
            name,
            password: hashpassword,
            address,
            phone,
            email,
            answer
        }).save();
        res.status(201).send({ msg: "user registered successfully", success: true });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "something wrong while registering", err, success: false });
    }
}

//login user
export let loginController = async (req, res) => {
    let { email, password } = req.body;
    try {
        if (!email) {
            return res.status(500).send({ msg: 'email is required' })
        }
        if (!password) {
            return res.status(500).send({ msg: 'password is required' })
        }
        let existingUser = await usersModal.findOne({ email: email });
        if (!existingUser) {
            return res.status(200).send({ msg: "incorrect details" })
        }
        let result = await matchPassword(password, existingUser.password);
        if (!result) {
            return res.status(200).send({ msg: "incorrect details" })
        }
        let token = jwt.sign({ _id: existingUser._id }, process.env.SECRET_KEY);
        res.status(200).send({
            msg: "User Logged in successfully",
            success: true,
            user: {
                name: existingUser.name,
                address: existingUser.address,
                email: existingUser.email,
                phone: existingUser.phone,
                role: existingUser.role
            }, token
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: "something wrong" })
    }
}

//forgot password
export let resetPassword = async (req, res) => {
    let { email, password, answer } = req.body;
    if (!email || !password || !answer) {
        return res.staus(200).send({ message: "All fileld required *", success: false })
    }
    let findUser = await usersModal.findOne({ email, answer });
    if (!findUser) {
        return res.status(200).send({ msg: "Either email or password are incorrect" })
    }
    let hashpassword = await encryptedPassword(password);
    let updateData = await usersModal.findByIdAndUpdate({ _id: findUser._id }, { password: hashpassword }, { new: true })
    res.status(200).send({ msg: "Password Update Successful", success: true })
}

//profile change
export let profileUpdateController = async (req, res) => {
    try {
        let { name, address, phone, password } = req.body
        if (!name || !address || !phone) {
            return res.staus(200).send({ message: "All fileld required *", success: false })
        }
        else {
            let findData = await usersModal.find({ _id: req.user._id })
            if (findData) {
                let newPassword = password ? await encryptedPassword(password) : findData.password;
                let updateData = await usersModal.findByIdAndUpdate({ _id: req.user._id }, { ...req.body, password: newPassword }, { new: true })
                res.status(200).send({ message: "Profile is Updated successful", success: true, user: updateData })
            }
            else {
                return res.status(500).send({ success: false, message: "somthing wrong" })
            }
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "Somthing wrong while updating", err, success: false })
    }
}

//all users data
export let getAllUsers = async (req, res) => {
    try {
        let { _id } = req.user;
        let allUsers = await usersModal.find({ _id: { $ne: _id } });
        res.status(200).send({ message: "all users data", allUsers, success: true })
    } catch (error) {
        res.status(500).send({ message: "something wrong all users data", error, success: false })
    }
}

//role change by admin
export let changeRoleController = async (req, res) => {
    try {
        let { id } = req.params;
        let { role } = req.body;
        let result = await usersModal.findByIdAndUpdate({ _id: id }, { role: role });
        res.send({ message: "Role changed successfully!", result, success: true })
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'something error', success: false, error })
    }
}

export let sellerRegisterController = async (req, res) => {
    let { email, password, name, store, address, gst } = req.body;
    try {
        if (!email) {
            return res.status(500).send({ msg: 'email is required' })
        } if (!password) {
            return res.status(500).send({ msg: 'password is required' })
        } if (!name) {
            return res.status(500).send({ msg: 'name is required' })
        } if (!store) {
            return res.status(500).send({ msg: 'store name is required' })
        } if (!address) {
            return res.status(500).send({ msg: 'address is required' })
        } if (!gst) {
            return res.status(500).send({ msg: 'GST is required' })
        }
        let findUser = await usersModal.findOne({ email: email })
        if (findUser) {
            return res.status(200).send({ msg: 'seller is already resgistered' })
        }
        let hashpassword = await encryptedPassword(password);
        let user = await new sellerModal({
            name,
            password: hashpassword,
            address,
            email,
            store,
            gst
        }).save();
        res.status(201).send({ msg: "seller registered successfully", success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'something error', success: false, error })
    }
}

export let sellerSigninController = async (req, res) => {
    let { email, password } = req.body;
    try {
        if (!email) {
            return res.status(500).send({ msg: 'email is required',success:false })
        }
        if (!password) {
            return res.status(500).send({ msg: 'password is required',success:false })
        }
        let existingUser = await sellerModal.findOne({ email: email });
        if (!existingUser) {
            return res.status(200).send({ msg: "incorrect details",success:false })
        }
        let result = await matchPassword(password, existingUser.password);
        if (!result) {
            return res.status(200).send({ msg: "incorrect details" ,success:false})
        }
        let token = jwt.sign({ _id: existingUser._id }, process.env.SECRET_KEY);
        res.status(200).send({
            msg: "User Logged in successfully",
            success: true,
            user: {
                name: existingUser.name,
                address: existingUser.address,
                email: existingUser.email,
                gst: existingUser.gst,
                store: existingUser.store
            }, token
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: "something wrong" })
    }
}