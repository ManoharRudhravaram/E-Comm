import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import UserDashboardMenu from '../../Components/UserDashboardMenu'
import { host, useAuth } from '../../Context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

function Profile() {
    const { t } = useTranslation();
    let { auth, setAuth } = useAuth();
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [phone, setPhone] = useState("");
    let [address, setAddress] = useState("");
    let [password, setPassword] = useState("");
    let navigate = useNavigate()
    let location = useLocation()

    //this is for address update handler
    async function updateUserProfile() {
        try {
            let {data}=await axios.put(`${host}/api/v1/profile-update`,
            {
                name,phone,address,password:password?password:''
            },{headers:{Authorization:auth.token}});
            toast(data.message)
            setAuth({user:data.user,token:auth.token});
            navigate(location.state|| '/')
        } catch (error) {
            console.log(err.message);
            toast(`⚡${err.message}`,{style:{color:"white",backgroundColor:"red"}})
            return;
        }
    }
    useEffect(() => {
        setName(auth.user.name);
        setEmail(auth.user.email);
        setAddress(auth.user.address);
        setPhone(auth.user.phone);
      }, []);
    return (
        <Layout title={"Update Profile -ecom"}>
            <div className="container m-5">
                <div className="row">
                    <div className="col-md-3">
                        <UserDashboardMenu />
                    </div>
                    <>
                        <div className="col-md-9">
                            <h4 className="text-center m-3">{t("dashboard.updateProfile")}</h4>
                            <hr />
                            <div className="mt-4">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    disabled
                                />
                            </div>
                            <div className="mt-4">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter your name"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    value={name}
                                />
                            </div>
                            <div className="mt-4">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter your address"
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                    }}
                                    value={address}
                                />
                            </div>
                            <div className="mt-4">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter your Phone no"
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                    }}
                                    value={phone}
                                />
                            </div>
                            <div className="mt-4">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    value={password}
                                />
                            </div>

                            <div className="mt-4 mb-4">
                                <button
                                    className="btn btn-primary"
                                    onClick={updateUserProfile}
                                >
                                {t('dashboard.updateUser')}
                                </button>
                            </div>
                        </div>

                    </>
                </div>
            </div>
        </Layout>
    )
}

export default Profile