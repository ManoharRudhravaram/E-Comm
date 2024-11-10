import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { host, useAuth } from '../../Context/AuthContext';
import { useTranslation } from 'react-i18next';

function SignIn() {
  const { t } = useTranslation();
  let { setAuth } = useAuth()
  let [formData, setFormData] = useState({ email: '', password: '' })
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
      if (!formData.email || !formData.password) {
        toast(`${t('toast.req')}`)
      }
      else {
        let res = await axios.post(`${host}/api/v1/login`, { ...formData });
        let data = res.data;
        if (data.success) {
          toast(data.msg);
          setAuth(data)
          //route to dashboard if accessed before login else to home
          navigate(location.state || "/");
        }
        else {
          toast(data.msg, { style: { color: "white", backgroundColor: "red" }, icon: '⚡' });
        }
      }
    }
    catch (err) {
      // console.log(err.message);  
      toast(err.message, { style: { color: "white", backgroundColor: "red" }, icon: '⚡' });
    }
  }
  return (
    <>
      <Layout title={'Sign In - Ecom'}>
        <h4 className="text-center m-5">{t('auth.logForm')}</h4>
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
                  {t('auth.log')}
                </button>
                <hr />
                <div className=' d-flex justify-content-around'>
                  <div>
                    <Link to={'/forgot-password'} >
                      {t('auth.fp')}
                    </Link>
                  </div>
                  <div>
                    <Link to={'/otplogin'} >
                      {t('auth.lop')}
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default SignIn