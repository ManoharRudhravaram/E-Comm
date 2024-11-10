import React from "react";
import AdminDashboardMenu from "../../Components/AdminDashboardMenu";
import Layout from "../../Components/Layout/Layout";
import useProduct from "../../Hooks/useProduct";
import { InfinitySpin } from 'react-loader-spinner'
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Products() {
    let { products, loading, error } = useProduct();
    let str='hello i am react'
    const {t}=useTranslation();
    return (
        <Layout title={"Admin All Products- ecom"}>
            <div className="container">
                <div className="row mt-4 ">
                    <div className="col-md-3">
                        <AdminDashboardMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className=" text-center">{t('product.allList')}</h1>
                        <div className="row">
                            {loading && <InfinitySpin
                                visible={true}
                                width="200"
                                color="#4fa94d"
                                ariaLabel="infinity-spin-loading"
                            />}
                            {!loading && error && <h4>{t('product.err')}</h4>}
                            {!loading && products.length > 0 && <>
                                {products?.map((item, i) => {
                                    let { name = "unknown", description = "contente will load", brand = "unknown", images = [], _id } = item
                                    return <div className="col-md-3 m-2" key={i}>
                                        <Link to={`/dashboard/admin/products/${_id}`} style={{ textDecoration: "none", color: "black" }}>
                                            <div className="card" >
                                                <div className="card-body">
                                                    <img src={images.length == 0 ? '' : images[1]?.url} alt="somthing" className="img-fluid" style={{height:"15rem",width:"25rem"}}/>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <p><strong>{name}</strong></p>
                                                <p>{description.split(' ').slice(0,4).join(' ')}...</p>
                                                <p>{brand}</p>
                                            </div>
                                        </Link>
                                    </div>
                                })}
                            </>}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Products;