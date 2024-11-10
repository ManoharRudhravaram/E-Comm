import React from 'react'
import Layout from '../../Components/Layout/Layout';
import UserDashboardMenu from '../../Components/UserDashboardMenu';
import { useAuth } from '../../Context/AuthContext';
import { useTranslation } from 'react-i18next';


function Dashbord() {
  const { t } = useTranslation();
  let {auth}=useAuth();
  let {name,email,phone,address}=auth.user;
  return (
    <Layout>
         <div className="container">
          <h1 className='text-center m-3'>{t('dashboard.user')}</h1>
          <div className="row d-flex justify-content-start">
             <div className="col-md-3">
               <UserDashboardMenu/>
             </div>
             <div className="col-md-9 d-flex align-items-center">
              <div>
                <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="" />
              </div>
              <div>
                <h4>{name}</h4>
                <h4>{email}</h4>
                <h4>{phone}</h4>
                <h4>{address}</h4>
              </div>
             </div>
          </div>
         </div>
    </Layout>
  )
}

export default Dashbord