import React from 'react';
import Layout from '../Components/Layout/Layout';
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlinePhone } from "react-icons/ai";
import { useTranslation } from 'react-i18next';

function Contact() {
  const { t } = useTranslation();
  let arr = [
    { icon: <CiMail />, about: t('contact.chatToUs'), msg: t('contact.chatMessage'), add: t('contact.email') },
    { icon: <CiLocationOn />, about: t('contact.office'), msg: t('contact.officeMessage'), add: t('contact.address') },
    { icon: <AiOutlinePhone />, about: t('contact.phone'), msg: t('contact.phoneMessage'), add: t('contact.phoneNumber') }
  ];

  return (
    <Layout title={t('contact.title')}>
      <div className="container-fluid">
        <h2 className="text-center m-3">{t('contact.getInTouch')}</h2>
        <h4 className="text-center m-3">{t('contact.contactPrompt')}</h4>
        <div className="row d-flex">
          {arr.map((item, i) => {
            let { icon, msg, about, add } = item;
            return (
              <div className="col-md-4 d-flex justify-content-evenly align-items-center gap-5px" key={i} style={{ height: '60vh' }}>
                <div className='d-flex align-items-center justify-content-evenly p-1 flex-column' style={{ height: '45vh', border: '1px solid grey', borderRadius: '15px' }}>
                  <div style={{ borderRadius: '100%', height: '5rem', width: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', fontSize: '3rem', color: 'white', backgroundColor: 'orange' }}>
                    {icon}
                  </div>
                  <h4 style={{ fontFamily: 'inherit' }}>{about}</h4>
                  <h4 style={{ color: 'purple', textAlign: 'center' }}>{msg}</h4>
                  <h4 style={{ fontSize: '1.6rem' }}>{add}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
