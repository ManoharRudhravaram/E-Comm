import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { host } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SellerSignin() {
    const { t } = useTranslation();
    let navigate=useNavigate()
    let [formData,setFormData]=useState({email:'',password:""})
    function formDataHandler(e){
        let {name,value}=e.target;
        setFormData((pre)=>{
            return {...pre,[name]:value}
        })
    }
    async function submitHandler(e){
        e.preventDefault()
        try {
            let {data}=await axios.post(`${host}/api/v1/seller_signin`,{...formData});
            console.log(data);
            if(data.success){
                toast(data.msg)
                navigate('/seller-Dashboard')
            }
            else{
                toast(data.msg)
            }
        } catch (error) {
            toast(error.message)
        }
    }
    return (
        <Layout title={'Sign In - Annoy'}>
            <h5 className='text-center mt-3'>{t('auth.sellerSignin')}</h5>
            <div className='container' style={{ height: "70vh" }}>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-5 mt-5">
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
                                    placeholder="Enter your Password"
                                    value={formData.password}
                                    onChange={formDataHandler}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={submitHandler}
                            >
                            {t('auth.signin')}
                            </button>
                            <hr />
                            <span>{t('auth.noAcc')} </span>
                            <Link to={'/seller-signup'}>
                                {t('auth.reg')}
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SellerSignin