import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import axios from 'axios';
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';
import { host } from '../../Context/AuthContext';
import { useTranslation } from 'react-i18next';

function SellerSignUp() {
  const { t } = useTranslation();
  let [formData, setFormData] = useState({ store: "", email: "", password: "", name: '', address: "", gst: "" })
  // seller_register
  function formDataHandler(e) {
    let { name, value } = e.target;
    setFormData((pre) => {
      return { ...pre, [name]: value }
    })
  }
  async function submitHandler(e) {
    try {
      e.preventDefault()
      if (!formData.name || !formData.email || !formData.password || !formData.address || !formData.store || !formData.gst) {
        toast(`${t('toast.req')}`)
      }
      else {
        let res = await axios.post(`${host}/api/v1/seller_register`, { ...formData });
        let data = await res.data;
        if (data.success) {
          toast(data.msg)
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
    <Layout title={'Sign Up - Annoy'}>
      <h4 className="text-center m-3">{t('auth.regForm')}</h4>
      <div className="container mt-4" style={{ height: "70vh" }}>
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
                  name="store"
                  placeholder="Enter your Store Name"
                  value={formData.store}
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
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="gst"
                  name="gst"
                  placeholder="Enter your GST Number"
                  value={formData.gst}
                  onChange={formDataHandler}
                />
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
                <span>{t('auth.alreadyReg')}</span>
                <Link to='/seller-Signin' >
                  {t('auth.signin')}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SellerSignUp