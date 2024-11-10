import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineCategory } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { CiMemoPad } from "react-icons/ci";
import '../i18n'; // Make sure to import this so i18n is initialized
import { useTranslation } from "react-i18next";

function AdminDashboardMenu() {
  let navStyle = { textDecoration: "none" }
  const{t}=useTranslation();

  return (
    <>
      <hr />
      <Link to={"/dashboard/admin/create-category"} style={navStyle}> <h6 style={{color:'black'}}><MdOutlineCategory/> {t('dashboard.createCategory')}</h6> </Link> <hr />
      <Link to={"/dashboard/admin/create-product"} style={navStyle}> <h6 style={{color:'black'}}><FaProductHunt/> {t('dashboard.createProduct')}</h6> </Link> <hr />
      <Link to={"/dashboard/admin/products"} style={navStyle}> <h6 style={{color:'black'}}><FaProductHunt/> {t('dashboard.product')}</h6> </Link> <hr />
      <Link to={"/dashboard/admin/users"} style={navStyle}> <h6 style={{color:'black'}}><FaUsers /> {t('dashboard.users')}</h6> </Link> <hr />
      <Link to={"/dashboard/admin/all-orders"} style={navStyle}> <h6 style={{color:'black'}}><CiMemoPad/> {t('dashboard.orders')}</h6> </Link> <hr />
    </>
  );
}

export default AdminDashboardMenu;