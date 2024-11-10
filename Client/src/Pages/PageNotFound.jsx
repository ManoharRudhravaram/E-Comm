import React from 'react';
import { Link } from 'react-router-dom';
import { FaAsymmetrik } from "react-icons/fa6";
import PNF from '../assets/PNFD.png';
import { useTranslation } from 'react-i18next';

function PageNotFound({ error }) {
  const { t } = useTranslation();
  return (
    <div className="container-fluid">
      <div className="nav">
        <div className='d-flex bg-primary w-100 justify-content-center' style={{ color: "white", fontSize: '3rem' }} >
          < FaAsymmetrik />
          <h2 className='m-2'>{t('pageNotFound.title')}</h2>
        </div>
        <div className="row d-flex align-items-center justify-content-evenly w-100" style={{ height: "80vh" }}>
          <div className="col-md d-flex flex-column align-items-center justify-content-evenly">
            <img src={PNF} alt="Page Not Found" className='img-fluid' />
            <h4>{error ? error.message : t('pageNotFound.message')}</h4>
            <Link to='/' className='btn btn-primary'>
              {t('pageNotFound.goHome')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
