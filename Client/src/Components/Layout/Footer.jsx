import React from 'react'
import { Link } from 'react-router-dom';
import '../../i18n'; // Make sure to import this so i18n is initialized
import { useTranslation } from 'react-i18next';

function Footer() {
  const {t}=useTranslation();

  return (
    <>
      <footer className="text-center" style={{ backgroundColor:'rgba(0,1,0,0.6)',color:'white' }} >
        <div className="container pt-4">
        <div style={{ textAlign: 'center' }}>
                <Link to="/about" style={{ textDecoration: "none", color: "white" }}><span style={{ marginRight: '10px' }}>{t('footer.about')}</span> </Link>
                <span style={{ marginRight: '10px' }}>|</span>
                <Link to="/contact" style={{ textDecoration: "none", color: "white" }}><span style={{ marginRight: '10px' }}>{t('footer.contact')}</span> </Link>
                <span style={{ marginRight: '10px' }}>|</span>
                <Link to="/policy" style={{ textDecoration: "none", color: "white" }}><span style={{ marginRight: '10px' }}>{t('footer.policy')}</span> </Link>
              </div>
        </div>
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        {t('footer.copyRight')}
        </div>
        </footer>

    </>
  )
}

export default Footer