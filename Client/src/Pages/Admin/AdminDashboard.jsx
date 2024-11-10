import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout';
import AdminDashboardMenu from '../../Components/AdminDashboardMenu';
import { useAuth } from '../../Context/AuthContext';
import QRCode from "react-qr-code";
import { useTranslation } from 'react-i18next';

function AdminDashboard() {
  let { auth } = useAuth();
  const {t}=useTranslation();
  let [qr, setQr] = useState(JSON.stringify(auth?.user))
  return (
    <Layout title='Admin Dashboard - ecom'>
      <div className="container">
        <h1 className='text-center m-3'>{t('dashboard.admin')}</h1>
        <div className="row d-flex justify-content-start">
          <div className="col-md-3">
            <AdminDashboardMenu />
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md mt-5 d-flex justify-content-evenly">
                <div >
                  <QRCode
                    size={160}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={qr}
                    viewBox={`0 0 256 256`}
                  />
                </div>
                <div className=' d-flex flex-column justify-content-evenly'>
                  <h5>{auth.user.name}</h5>
                  <h5>{auth.user.email}</h5>
                  <h5>{auth.user.phone}</h5>
                  <h5>{auth.user.address}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard