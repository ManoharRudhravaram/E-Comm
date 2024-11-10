import React from 'react';
import {Helmet} from 'react-helmet';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';

function Layout({children,description,keywords,author,title}) {
  
  return (
    <>
    <Toaster/>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Navbar/>
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <Footer />
    </>
  )
}

Layout.defaultProps={
    description:"Best app for online shopping",
    keywords:"online shopping || elcotrnic",
    author:"Manohar",
    title:"Online Store"
  }

export default Layout