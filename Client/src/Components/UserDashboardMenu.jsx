import React from "react";
import { Link } from "react-router-dom";
import '../i18n'; // Make sure to import this so i18n is initialized
import { useTranslation } from "react-i18next";

function UserDashboardMenu() {
    let navStyle={textDecoration:"none"}
  const {t}=useTranslation();
  return (
    <>
      <ul className="list-group">
       <Link style={navStyle} to={"/dashboard/user/order"}><li className="list-group-item">{t('dashboard.users')}</li></Link> 
        <Link style={navStyle} to={"/dashboard/user/profile"}> <li className="list-group-item">{t('dashboard.profile')}</li> </Link> 
      </ul>
    </>
  );
}

export default UserDashboardMenu;