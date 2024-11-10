import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { host, useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function OTP() {
    const { t } = useTranslation();
    let navigate = useNavigate()
    let { auth, setAuth } = useAuth()
    let [email, setEmail] = useState('')
    let [otp, setOtp] = useState(new Array(4).fill(''))
    let inputRefs = useRef([]);
    let [toggle, setToggle] = useState(false);
    let [btn, setBtn] = useState('send Otp')
    function sendOtpHandler() {
        setToggle(true)
    }

    async function sendOtpHandler(e) {
        e.preventDefault()
        try {
            if (!email) {
                toast(`${t('toast.email')}`)
            }
            else {
                let { data } = await axios.post(`${host}/api/v1/otp`, { email });
                setToggle(!toggle)
                if (data.success) {
                    toast(`${t('toast.otp')}`)
                    setBtn('resend otp')
                }
            }
        } catch (err) {
            console.log(err);
            toast(`⚡${err.message}`, { style: { color: "white", backgroundColor: "red" } })

        }
    }
    async function submitHandler(e) {
        e.preventDefault()
        try {
            const formattedOTP = parseInt(otp.join(''), 10);
            let { data } = await axios.post(`${host}/api/v1/otp/validate`, { otp: formattedOTP, email });
            if (data.success) {
                toast(data.msg);
                setAuth(data)
                navigate("/");
            }
        }
        catch (err) {
            console.log(err);
            toast(`⚡${err.message}`, { style: { color: "white", backgroundColor: "red" } })

        }
    }

    function changeHandler(e, i) {
        let { value } = e.target
        let newArray = [...otp]
        newArray[i] = value
        setOtp(newArray)
        //this is logic for move next
        if (value && i < otp.length - 1 && inputRefs.current[i + 1]) {
            inputRefs.current[i + 1].focus()
        }
    }

    function keypress(e, i) {
        if (e.key == "Backspace" && i > 0 && !otp[i] && inputRefs.current[i - 1]) {
            inputRefs.current[i - 1].focus()
        }
    }

    useEffect(() => {
        if (toggle) inputRefs.current[0].focus()
        setTimeout(() => {
            setToggle(!toggle)
        }, 60000);
    }, [toggle])

    return (
        <Layout>
            <div className="container">
                <h3 className='text-center mt-3'>{t("auth.login")}</h3>
                <div className="row  d-flex align-items-center justify-content-evenly">
                    <div className="col-md-5">
                        <form className='d-flex flex-column align-items-center'>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    style={{ width: "20rem" }}
                                    disabled={toggle}
                                />
                            </div>
                            {
                                !toggle && <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={sendOtpHandler}
                                >
                                    {btn}
                                </button>
                            }
                            <div className='d-flex justify-content-evenly align-items-center mt-5' style={{ width: '15rem' }}>
                                {toggle && otp.map((digit, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        maxLength={1}
                                        onChange={(e) => {
                                            changeHandler(e, i)
                                        }}
                                        ref={(input) => {
                                            inputRefs.current[i] = input
                                        }}
                                        onKeyDown={(e) => {
                                            keypress(e, i)
                                        }}
                                        style={{ width: "2rem" }}
                                    />
                                ))}
                            </div>
                            {
                                toggle && <button className='btn btn-info mt-3' onClick={submitHandler}>{t('form.submit')}</button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default OTP