import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Select, Upload } from "antd";
import { Option } from "antd/es/mentions";
import { UploadOutlined } from "@ant-design/icons";
import { useCategory } from "../../Hooks/useContext";
import useProduct from "../../Hooks/useProduct";
import Layout from "../../Components/Layout/Layout";
import AdminDashboardMenu from "../../Components/AdminDashboardMenu";
import { host, useAuth } from "../../Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../Components/Loading";
import { useTranslation } from "react-i18next";

function UpdateProduct() {
    const { t } = useTranslation()
    let { id } = useParams();
    let { auth } = useAuth();
    let navigate = useNavigate()
    let { singleProduct, product, singleLoading, singleError, setChangeProduct, changeProduct } = useProduct();
    let { categories } = useCategory();
    let [category, setCategory] = useState();
    let [images, setImages] = useState([]);
    let [name, setName] = useState("");
    let [brand, setBrand] = useState("");
    let [price, setPrice] = useState("");
    let [description, setDescrition] = useState("");
    let [shipping, setShipping] = useState("");
    let [quantity, setQuantity] = useState("");
    let [color, setColor] = useState('')
    let [task, setTask] = useState(false);
    function categorySelector(value) {
        setCategory(value);
    }

    //this is for submit product handler
    async function updateProductHandler(e) {
        try {
            if (
                !name ||
                !description ||
                !brand ||
                !price ||
                !category ||
                !quantity ||
                !shipping ||
                !color
            ) {
                toast(`${t('toast.req')}`);
            }
            setTask(true)
            let formData = new FormData();
            formData.append("name", name);
            formData.append("price", price);
            formData.append("description", description);
            formData.append("brand", brand);
            formData.append("quantity", quantity);
            formData.append("category", category);
            formData.append("shipping", shipping);
            formData.append("color", color);
            for (let i = 0; i < images.length; i++) {
                formData.append("images", images[i].originFileObj);
            }
            let res = await axios.put(`${host}/api/v1/updateproduct/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: auth.token,
                },
            });
            if (res.data.success) {
                toast(res.data.msg);
                setChangeProduct(!changeProduct);
                navigate("/dashboard/admin/products");
            } else {
                toast(res.data.msg, { style: { color: "red" } });
            }
        } catch (err) {
            console.log(err);
            toast(`⚡${err.message}`, { style: { color: "white", backgroundColor: "red" } })
        }
        finally {
            setTask(false)
        }
    }

    async function deleteProductHandler() {
        setTask(true)
        try {
            let { data } = await axios.delete(`${host}/api/v1/deleteproduct/${id}`, { headers: { Authorization: auth.token } });
            if (data.success) {
                toast(data.msg)
                setChangeProduct(!changeProduct);
                navigate('/dashboard/admin/products');
            }
            else {
                toast(data.msg, { style: { color: 'red' } })
            }
        } catch (error) {
            console.log(error);
            toast(`⚡${error.message}`, { style: { color: "white", backgroundColor: "red" } })
        }
        finally {
            setTask(false)
        }
    }

    useEffect(() => {
        singleProduct(id);
    }, []);

    useEffect(() => {
        if (Object.keys(product).length > 0) {
            setCategory(product?.category?._id);
            setName(product?.name);
            setDescrition(product?.description);
            setPrice(product?.price);
            setBrand(product?.brand);
            setShipping(product?.shipping);
            setImages(product?.images);
            setQuantity(product?.quantity);
            setColor(product?.color);
        }
    }, [singleLoading]);

    return (
        <Layout title={"Update and Delete -ecom"}>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <AdminDashboardMenu />
                    </div>
                    {task && <div style={{ position: 'absolute', top: '5rem', width: "100%" }}>
                        <Loading />
                    </div>}
                    {singleLoading && <h4>{t('spinner.loading')}</h4>}
                    {!singleLoading && singleError && <h4>{t('product.err')}</h4>}
                    {!singleLoading && Object.keys(product).length > 0 && (
                        <>
                            <div className="col-md-9">
                                <h1 className="text-center">{t('product.sp')}</h1>
                                <div className="col-md-9">
                                    <h4 className="text-center m-3">
                                        {t('product.upddel')}
                                    </h4>
                                    <hr />
                                    {/* //this is for the category selector */}
                                    <div className="categorySelector">
                                        {categories.length > 0 && (
                                            <Select
                                                showSearch
                                                placeholder="Select a Category"
                                                optionFilterProp="children"
                                                onChange={categorySelector}
                                                style={{ width: "500px" }}
                                                value={category}
                                            >
                                                {categories?.map((item, i) => {
                                                    return <Option value={item._id} key={i}>{item.name}</Option>;
                                                })}
                                            </Select>
                                        )}
                                    </div>
                                    <div className="mt-4">
                                        <Upload
                                            listType="picture"
                                            onChange={({ fileList }) => {
                                                setImages(fileList);
                                            }}
                                            customRequest={() => false}
                                            beforeUpload={() => false}
                                            maxCount={4}
                                            multiple
                                            value={[...images]}
                                            accept="image/*"
                                        >
                                            <Button icon={<UploadOutlined />}>{t('dashboard.upload')}</Button>
                                        </Upload>
                                    </div>
                                    <div className="mt-4">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Write Product Name"
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                            value={name}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <input
                                            type="text"
                                            name="description"
                                            className="form-control"
                                            placeholder="Write a description"
                                            onChange={(e) => {
                                                setDescrition(e.target.value);
                                            }}
                                            value={description}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <input
                                            type="text"
                                            name="brand"
                                            className="form-control"
                                            placeholder="Write a brand"
                                            onChange={(e) => {
                                                setBrand(e.target.value);
                                            }}
                                            value={brand}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <input
                                            type="text"
                                            name="price"
                                            className="form-control"
                                            placeholder="Enter your Price"
                                            onChange={(e) => {
                                                setPrice(e.target.value);
                                            }}
                                            value={price}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <input
                                            type="number"
                                            name="quantity"
                                            className="form-control"
                                            placeholder="Write a quantity"
                                            onChange={(e) => {
                                                setQuantity(e.target.value);
                                            }}
                                            value={quantity}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <Select
                                            placeholder="Color"
                                            optionFilterProp="children"
                                            style={{ width: "500px" }}
                                            value={color}
                                            onChange={(value) => {
                                                setColor(value)
                                            }}
                                        >
                                            <Option value="red">RED</Option>
                                            <Option value="green">GREEN</Option>
                                            <Option value="blue">BLUE</Option>
                                            <Option value="black">BLACK</Option>
                                            <Option value="white">WHITE</Option>
                                            <Option value="yellow">YELLOW</Option>
                                            <Option value="brown">BROWN</Option>
                                            <Option value="pink">PINK</Option>
                                        </Select>
                                    </div>
                                    <div className="mt-4">
                                        <Select
                                            placeholder="Shipping"
                                            optionFilterProp="children"
                                            style={{ width: "500px" }}
                                            value={shipping}
                                            onChange={(value) => {
                                                setShipping(value);
                                            }}
                                        >
                                            <Option value="yes">{t('dashboard.yes')}</Option>
                                            <Option value="no">{t('dashboard.no')}</Option>
                                        </Select>
                                    </div>
                                    <div className="mt-4 mb-4">
                                        <button
                                            className="btn btn-primary"
                                            onClick={updateProductHandler}
                                        >
                                            {t('dashboard.updateProduct')}
                                        </button>
                                        <button className="btn btn-danger" onClick={deleteProductHandler}>{t('dashboard.deleteProduct')}</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default UpdateProduct;