import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from '../../Components/Layout/Layout';
import { host, useAuth } from "../../Context/AuthContext";
import UserDashboardMenu from '../../Components/UserDashboardMenu';
import { useTranslation } from 'react-i18next';

function Order() {
    const { t } = useTranslation();
    let { auth } = useAuth();
    let [orders, setOrders] = useState([]);
    async function getOrder() {
        try {
            let { data } = await axios(`${host}/api/v1/orders`, {
                headers: { Authorization: auth.token },
            });
            if (data.success) {
                setOrders(data.orders);
            } else {
                toast(data.msg, { style: { color: "red" } });
                return;
            }
        } catch (err) {
            console.log(err);
            toast(`⚡${err.message}`, { style: { color: "white", backgroundColor: "red" } })
        }
    }
    useEffect(() => {
        getOrder();
    }, []);
    return (
        <Layout title={"All Orders - Annoy"}>
            <div className="container">
                <h1 className="text-center m-3">All Orders</h1>
                <div className="row">
                    <div className="col-md-3">
                        <UserDashboardMenu />
                    </div>
                    <div className="col-md-9">
                        <h6 className="text-center m-3">{t('dashboard.allOrders')}</h6>
                        <hr />
                        <table className="table " >
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">{t('dashboard.status')}</th>
                                    <th scope="col">{t('dashboard.buyer')}</th>
                                    <th scope="col">{t('dashboard.date')}</th>
                                    <th scope="col">{t('dashboard.payment')}</th>
                                    <th scope="col">{t('cart.qty')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length == 0 && <h6>{t('dashboard.nop')}</h6>}
                                {orders.length > 0 &&
                                    orders?.map((item, i) => {
                                        return (
                                            <>
                                                <tr key={i} className="mb-2">
                                                    <td>{i + 1}</td>
                                                    <td>{item?.status}</td>
                                                    <td>{item?.buyer?.name}</td>
                                                    <td>{"2/3/2023"}</td>
                                                    <td>{t(item?.payment?.success ? "dashboard.success" : "dashboard.fail")}</td>
                                                    <td>{item.products.length}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={'6'}>
                                                        <div className="container">
                                                            {item?.products?.map((item, i) => {
                                                                return (
                                                                    <React.Fragment key={i}>
                                                                        <div className="row m-2">
                                                                            <div className="col-md-6">
                                                                                <img
                                                                                    src={item?.images[0]?.url}
                                                                                    alt={item?.images[0]?.url}
                                                                                    className="img-fluid"
                                                                                    style={{ height: "14rem", width: '18rem' }}
                                                                                />
                                                                            </div>
                                                                            <div className="col-md-6 d-flex flex-column align-items-center justify-content-evenly">
                                                                                <h6>{item?.name}</h6>
                                                                                <strong>{item?.brand}</strong>
                                                                                <p>{t('cart.price')}: Rs.{item?.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                    </React.Fragment>
                                                                );
                                                            })}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </>
                                        );
                                    })}
                                <br />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Order;