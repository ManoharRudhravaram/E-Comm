import React from 'react';
import Layout from '../Components/Layout/Layout';
import { Link } from 'react-router-dom';
import seller from '../assets/seller.webp';
import { useTranslation } from 'react-i18next';

function Seller() {
    const { t } = useTranslation();
    let arr = [
        { img: "https://static-assets-web.flixcart.com/fk-sp-static/images/crore_users_revamp.svg", text: t("seller.features.0") },
        { img: "https://static-assets-web.flixcart.com/fk-sp-static/images/wallet-icon.svg", text: t("seller.features.1") },
        { img: "https://static-assets-web.flixcart.com/fk-sp-static/images/low-cost-icon.svg", text: t("seller.features.2") },
        { img: "https://static-assets-web.flixcart.com/fk-sp-static/images/seller-support-icon.svg", text: t("seller.features.3") },
        { img: "https://static-assets-web.flixcart.com/fk-sp-static/images/shopping-bag-icon.svg", text: t("seller.features.4") }
    ];

    return (
        <Layout title={t('seller.title')}>
            <div className='container'>
                <div className="row m-1">
                    <div className="col-md d-flex justify-content-evenly">
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={'/seller-Signup'}>
                            <h5 className='btn btn-primary'>{t('seller.createAccount')}</h5>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={'/seller-Signin'}>
                            <h5 className='btn btn-secondary'>{t('seller.loginAccount')}</h5>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md">
                        <h4 style={{ position: 'absolute', top: "12rem", zIndex: "5", fontFamily: "revert", fontSize: "40px", fontWeight: "bolder" }}>
                            {t('seller.header')}
                        </h4>
                        <img src={seller} alt="seller-banner" className='img-fluid' style={{ position: 'relative' }} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md border m-2 d-flex align-items-center justify-content-evenly" style={{ height: "150px", borderRadius: "10px", boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
                        {arr.map((item, i) => (
                            <div className="col-md-2 d-flex align-items-center justify-content-center flex-column" key={i}>
                                <img src={item.img} alt={`icon-${i}`} />
                                <h6 className='text-center'>{item.text}</h6>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Seller;
