import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminDashboardMenu from '../../Components/AdminDashboardMenu'
import { Button, Select, Upload } from "antd";
import { Option } from "antd/es/mentions";
import { UploadOutlined } from "@ant-design/icons";
import { useCategory } from '../../Hooks/useContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { host, useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useProduct from '../../Hooks/useProduct';
import Loading from '../../Components/Loading';
import { useTranslation } from 'react-i18next';

function CreateProduct() {
    const { t } = useTranslation();
    let [task, setTask] = useState(false);
    let navigate = useNavigate();
    let { auth } = useAuth();
    let { categories } = useCategory();
    let { changeProduct, setChangeProduct } = useProduct();
    let [category, setCategory] = useState('')
    let [name, setName] = useState('')
    let [price, setPrice] = useState('')
    let [brand, setBrand] = useState('')
    let [quantity, setQuantity] = useState('')
    let [Shipping, setShipping] = useState('')
    let [images, setImages] = useState([])
    let [description, setDescription] = useState('');
    let [color, setColor] = useState('')
    function categorySelector(value) {
        setCategory(value)
    }

    async function submitProductHandler(e) {
        try {
            e.preventDefault()
            if (!name || !price || !quantity || !description || !Shipping || !brand || !category || !color || images.length == 0) {
                toast(`${t('toast.req')}`)
            }
            else {
                setTask(true)
                let formData = new FormData();
                formData.append('name', name)
                formData.append('brand', brand)
                formData.append('price', price)
                formData.append('description', description)
                formData.append('quantity', quantity)
                formData.append('category', category)
                formData.append('shipping', Shipping)
                formData.append('color', color)
                for (let i = 0; i < images.length; i++) {
                    formData.append('images', images[i].originFileObj)
                }
                let { data } = await axios.post(`${host}/api/v1/createproduct`, formData, { headers: { Authorization: auth.token } });
                if (data.success) {
                    navigate('/dashboard/admin/products')
                    toast(data.msg)
                    setChangeProduct(!changeProduct)
                    setName('')
                    setBrand('')
                    setDescription('')
                    setImages([])
                    setPrice('')
                    setQuantity('')
                    setColor('')
                }
                else {
                    toast(data.msg, { style: { color: "red" } })
                }
            }

        } catch (error) {
            toast(`⚡${error.message}`, { style: { color: "white", backgroundColor: "red" } })
        } finally {
            setTask(false)
        }
    }
    return (
        <Layout title={"Create Product - Annoy"}>
            <div className="container">
                <h1 className='text-center mt-3 mb-2'>{t('dashboard.admin')}</h1>
                <div className="row">
                    <div className="col-md-3">
                        <AdminDashboardMenu />
                    </div>
                    <div className="col-md-9">
                        <h4 className='text-center'>{t('dashboard.createProduct')}</h4>
                        <hr />
                        {categories.length > 0 && (
                            <Select showSearch
                                placeholder="Select a Category"
                                optionFilterProp="children"
                                onChange={categorySelector}
                                style={{ width: "500px" }}>
                                {categories?.map((item, i) => {
                                    return <Option value={item._id} key={i}>{item.name}</Option>;
                                })}
                            </Select>
                        )}
                        <div className="mt-4">
                            <Upload listType="picture" onChange={({ fileList }) => {
                                setImages(fileList)
                            }}
                                customRequest={() => false}
                                beforeUpload={() => false}
                                maxCount={4}
                                multiple
                                accept="image/*">
                                <Button icon={<UploadOutlined />}>{t('dashboard.upload')}</Button>
                            </Upload>
                        </div>
                        <div className="mt-4">
                            <input className="form-control" type="text" name='name' placeholder='product name' onChange={(e) => { setName(e.target.value) }} value={name} />
                        </div>
                        <div className="mt-4">
                            <input className="form-control" type="text" name='price' placeholder='product price' onChange={(e) => { setPrice(e.target.value) }} value={price} />
                        </div>
                        <div className="mt-4">
                            <input className="form-control" type="text" name='quantity' placeholder='product quantity' onChange={(e) => { setQuantity(e.target.value) }} value={quantity} />
                        </div>
                        <div className="mt-4">
                            <input className="form-control" type="text" name='description' placeholder='product description' onChange={(e) => { setDescription(e.target.value) }} value={description} />
                        </div>
                        <div className="mt-4">
                            <input className="form-control" type="text" name='brand' placeholder='brand name' onChange={(e) => { setBrand(e.target.value) }} value={brand} />
                        </div>
                        <div className="mt-4">
                            <Select
                                placeholder="Color"
                                optionFilterProp="children"
                                style={{ width: "500px" }}
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
                                <Option value="pink">Multi Colour</Option>
                            </Select>
                        </div>
                        <div className="mt-4">
                            <Select
                                placeholder="Shipping"
                                optionFilterProp="children"
                                style={{ width: "500px" }}
                                onChange={(value) => {
                                    setShipping(value)
                                }}
                            >
                                <Option value="yes">{t('dashboard.yes')}</Option>
                                <Option value="no">{t('dashboard.no')}</Option>
                            </Select>
                        </div>
                        <div className="mt-4 mb-4">
                            <button className="btn btn-primary" onClick={submitProductHandler}>{t('dashboard.createProduct')}</button>
                            {task && <Loading />}
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default CreateProduct    