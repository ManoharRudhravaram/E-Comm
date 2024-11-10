import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminDashboardMenu from "../../Components/AdminDashboardMenu";
import { host, useAuth } from "../../Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

export default function AllOrders() {
    const { t } = useTranslation();
    let { auth } = useAuth();
    let [orders, setOrders] = useState([]);
    let enums = ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"];
    let [status, setStatus] = useState(false);
    //get all orders
    async function getOrders() {
        try {
            let { data } = await axios.get(`${host}/api/v1/all-orders`, { headers: { Authorization: auth.token } });
            if (data.success) setOrders(data.orders);
            else toast(data.msg)
        } catch (error) {
            console.log(error.message);
            toast(`⚡${error.message}`, { style: { color: "white", backgroundColor: "red" } })
        }
    }

    //change status
    async function statusHandler(value, id) {
        try {
            let { data } = await axios.put(`${host}/api/v1//update-order/${id}`, { status: value }, { headers: { Authorization: auth.token } });
            if (data.success) {
                toast(data.msg)
                setStatus(!status)
            }
            else {
                toast(data.msg)
            }
        } catch (error) {
            console.log(error);
            toast(`⚡${error.message}`, { style: { color: "white", backgroundColor: "red" } })
        }
    }
    useEffect(() => {
        getOrders()
    }, [status])
    return (
        <Layout title={"All Orders - Annoy"}>
            <div className="container">
                <h1 className='text-center mt-3 '>{t('dashboard.admin')}</h1>
                <div className="row">
                    <div className="col-md-3">
                        <AdminDashboardMenu />
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
                                                    <td>
                                                        <Select
                                                            style={{ width: "100px" }}
                                                            value={item.status}
                                                            showSearch
                                                            onChange={(e) => {
                                                                statusHandler(e, item._id)
                                                            }}
                                                        >
                                                            {enums?.map((item) => {
                                                                return <Option value={item}>{item}</Option>;
                                                            })}
                                                        </Select>
                                                    </td>
                                                    <td>{item?.buyer?.name}</td>
                                                    <td>{"2/3/2023"}</td>
                                                    <td>{t(item?.payment?.success ? "dashboard.success" : "dashboard.fail")}</td>
                                                    <td>{item?.products.length}</td>
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
    )
}