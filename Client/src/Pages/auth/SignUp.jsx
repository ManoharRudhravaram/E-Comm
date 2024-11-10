import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom';
import { host } from '../../Context/AuthContext';
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { useTranslation } from 'react-i18next';

function SignUp() {
  const { t } = useTranslation();
  let [toggle, setToggle] = useState(false);
  let [formData, setFormData] = useState({ name: '', email: '', password: '', phone: "", address: "", answer: "" })
  let navigate = useNavigate();

  //onChange handler
  function formDataHandler(e) {
    let { name, value } = e.target;
    setFormData((pre) => {
      return { ...pre, [name]: value }
    })
  }

  //submit formData 
  async function submitHandler(e) {
    try {
      e.preventDefault()
      if (!formData.name || !formData.email || !formData.password || !formData.address || !formData.phone || !formData.answer) {
        toast(`${t('toast.req')}`)
      }
      else {
        let res = await axios.post(`${host}/api/v1/register`, { ...formData });
        let data = await res.data;
        if (data.success) {
          toast(data.msg)
          navigate('/signin')
        }
        else {
          toast(data.msg, { style: { color: 'red' } })
        }
      }
    }
    catch (err) {
      toast(`⚡${err.message}`, { style: { color: "white", backgroundColor: "red" } })
    }
  }
  return (
    <>
      <Layout title={'Sign Up - Ecom'}>
        <h4 className="text-center m-3">{t('auth.regform')}</h4>
        <div className="container mt-5" style={{ height: "70vh" }}>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-5">
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={formDataHandler}
                  />
                </div>
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
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Enter your Mobile No."
                    value={formData.phone}
                    onChange={formDataHandler}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={formDataHandler}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center justify-content-evenly">
                  <input
                    type={toggle ? "text" : "password"}
                    className="form-control"
                    id="answer"
                    name="answer"
                    placeholder="Enter your nick name"
                    value={formData.answer}
                    onChange={formDataHandler}
                    style={{ width: '90%' }}
                  />
                  <span className=' btn btn-hover' onClick={() => { setToggle(!toggle) }}> {toggle ? <LuEye /> : <LuEyeOff />} </span>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={submitHandler}
                >
                  {t('auth.reg')}
                </button>
                <hr />
                <div>
                  <Link to='/signin' >
                    {t('auth.alreadyReg')} {t('auth.signin')}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default SignUp