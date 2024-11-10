import { useAuth } from '../../Context/AuthContext';
import { Link, NavLink } from 'react-router-dom';
import '../../i18n'; // Make sure to import this so i18n is initialized
import { useTranslation } from 'react-i18next';
import { FaAsymmetrik, FaCartShopping, FaStore } from 'react-icons/fa6';
import useCart from '../../Hooks/useCart';
import { languageContext } from '../../Context/LanguageContext';
import { useCategory } from '../../Hooks/useContext';
import { useTheme } from '../../Hooks/useTheme';
import React, { useContext } from 'react';
import "../../App.css";
import { Badge } from 'antd';
import india from "../../assets/india.png";
import france from "../../assets/france.png";
import SearchBar from '../Form/Search';
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
export default function Navbar() {
    const { t } = useTranslation();
    const { auth, setAuth } = useAuth();
    const { cart } = useCart();
    const { languageHandler, lang } = useContext(languageContext);
    const { theme, changeTheme } = useTheme();
    function logoutHandler() {
        setAuth({ "user": '', "token": null });
    }

    const { categories } = useCategory();
    const cartCount = cart.reduce((acc, item) => acc + item.count, 0);
    return (
        <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: "#10898d", boxShadow: 'inherit' }}>
            <div className="container-fluid">
                <Link to={'/'} style={{ textDecoration: "none" }}>
                    <div className='d-flex w-10' style={{ color: "white", fontSize: '3rem' }}>
                        <FaAsymmetrik />
                        <h2 className='m-2'>{t('header.title')}</h2>
                    </div>
                </Link>
                <SearchBar />
                <div className='ms-5'>
                    <label className="switch">
                        <input type="checkbox" id="themeToggle" checked={theme === 'dark'} onChange={changeTheme} />
                        <span className="slider">
                            {theme === 'dark' ? (
                                <FiSun style={{ color: '#fff', position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' }} />
                            ) : (
                                <FiMoon style={{ color: '#ffd700', position: 'absolute', left: '33px', top: '50%', transform: 'translateY(-50%)' }} />
                            )}
                        </span>
                    </label>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle text-white"
                                to="/all-category"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {t('header.category')}
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <Link className="dropdown-item" to={'/all-category'}>
                                        {t('header.allCategory')}
                                    </Link>
                                </li>
                                {categories.map((item, i) => (
                                    <li key={i}>
                                        <Link className="dropdown-item" to={`/all-category/${item.slug}`}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        {auth?.token ? (
                            <>
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link dropdown-toggle text-white"
                                        to="/"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {auth?.user?.name}
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <Link className="dropdown-item" to={auth.user.role ? "/dashboard/admin" : "/dashboard/user"}>
                                                {t('header.dashboard')}
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="dropdown-item" onClick={logoutHandler} to={'/signin'}>
                                                {t('header.logout')}
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/seller">
                                        <FaStore style={{ fontSize: "1.5rem" }} />{t('header.becomeSeller')}
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-white" to="/signup">
                                        {t('header.signup')}
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-white" to="/signin">
                                        {t('header.signin')}
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/seller">
                                        <FaStore style={{ fontSize: "1.5rem" }} /> {t('header.becomeSeller')}
                                    </Link>
                                </li>
                                <li>
                                    <div className="dropdown">
                                        <button className="dropbtn d-flex gap-1"><img src={lang === "en" ? india : france} alt="flag" style={{ width: "25px" }} />{lang === "en" ? t('header.language.english') : t('header.language.french')}</button>
                                        <div className="dropdown-content">
                                            <ul>
                                                <li onClick={() => languageHandler({ target: { value: 'en' } })}>{t('header.language.english')}</li>
                                                <li onClick={() => languageHandler({ target: { value: 'fr' } })}>{t('header.language.french')}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/cart">
                                <Badge count={cartCount} showZero>
                                    <div style={{ padding: "5px", fontSize: "1.4rem" }}>
                                        <FaCartShopping style={{ color: 'white' }} />
                                    </div>
                                </Badge>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
