import React, { useState } from 'react'
import { host, useAuth } from '../../Context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

function ForgotPassword() {
    const { t } = useTranslation();
    let { setAuth } = useAuth()
    let [formData, setFormData] = useState({ email: '', password: '', answer:"" })
    let navigate = useNavigate();
    let location = useLocation();
    function formDataHandler(e) {
        let { name, value } = e.target;
        setFormData((pre) => {
            return { ...pre, [name]: value }
        })
    }

    async function submitHandler(e) {
        try {
            e.preventDefault();
            if (!formData.email || !formData.password ||!formData.answer) {
                toast(`${t('toast.req')}`)
            }
            else {
                // let res = await axios.post(`http://localhost:8080/api/v1/login`, { ...formData });
                let res = await axios.post(`${host}/api/v1/reset-password`, { ...formData });
                let data = res.data;
                if (data.success) {
                    toast(data.message);
                    setAuth(data)
                    navigate("/signin");
                }
            }
        }
        catch (err) {
            console.log(err);
      toast(`⚡${err.message}`,{style:{color:"white",backgroundColor:"red"}})
        }
    }
    return (
        <>
            <Layout title={'Password Recovery - Ecom'}>
                <h4 className="text-center m-5">{t("auth.recoverPassword")}</h4>
                <div className="container" style={{ height: "70vh" }}>
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-5">
                            <form>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={formDataHandler}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Enter your new Password"
                                        value={formData.password}
                                        onChange={formDataHandler}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        name="answer"
                                        placeholder="Enter your nick name"
                                        value={formData.answer}
                                        onChange={formDataHandler}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={submitHandler}
                                >
                                {t('form.submit')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default ForgotPassword