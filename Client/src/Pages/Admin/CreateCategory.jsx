import React, { useState } from 'react'
import AdminDashboardMenu from '../../Components/AdminDashboardMenu'
import Layout from '../../Components/Layout/Layout'
import axios from 'axios';
import { host, useAuth } from '../../Context/AuthContext';
import { useCategory } from '../../Hooks/useContext';
import toast from 'react-hot-toast';
import CategoryForm from '../../Components/Form/CategoryForm';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';

function CreateCategory() {
  const {t}=useTranslation();
    let [isModalOpen, setIsModalOpen] = useState(false);
    let [categoryId, setCategoryId] = useState('')
    let { auth } = useAuth();
    //custom hook
    let { categories, changeCategory, setChangeCategory } = useCategory();
    //input handler state
    let [input, setInput] = useState('');

    //inputhandler onchange 
    function inputHandler(e) {
        setInput(e.target.value)
    }

    //submitHandler
    async function submitHandler() {
        try {
            let { data } = await axios.post(`${host}/api/v1/create-category`, { name: input }, { headers: { Authorization: auth.token } })
            if (data.success) {
                toast(data.msg)
                setChangeCategory(!changeCategory)
                setInput('')
            }
            else {
                toast(`${data.msg}`,{style:{color:"red"}})
            }
        } catch (error) {
            toast(`⚡${error.message}`,{style:{color:"white",backgroundColor:"red"}})
        }
    }

    async function deleteCategoryHandler(id) {
        try {
            let { data } = await axios.delete(`${host}/api/v1/delete-category/${id}`, { headers: { Authorization: auth.token } });
            if (data.success) {
                toast(data.msg)
                setChangeCategory(!changeCategory)
            }
            else {
                toast(data.msg)
            }
        } catch (error) {
            toast(`⚡${error.message}`,{style:{color:"white",backgroundColor:"red"}})
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        try {
            let { data } = await axios.put(`${host}/api/v1/update-category/${categoryId}`, { name: input }, { headers: { Authorization: auth.token } })
            if (data.success) {
                toast(data.msg)
                setChangeCategory(!changeCategory)
                setInput('')
                setIsModalOpen(false)
            }
            else {
                toast(data.msg)
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleCancel = () => {
        setInput('')
        setIsModalOpen(false);
    };
    return (
        <Layout title={"Create Category - Annoy"}>
            <div className="container">
                <h1 className='text-center mt-3 mb-2'>{t('dashboard.admin')}</h1>
                <div className="row">
                    <div className="col-md-3">
                        <AdminDashboardMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <h4 className=' text-center text-success text-xl'>{t('dashboard.manageCategory')}</h4>
                            {
                                !isModalOpen && <CategoryForm inputHandler={inputHandler} submitHandler={submitHandler} input={input} />
                            }
                            {
                                categories.length == 0 && <h1>{t('spinner.loading')}</h1>
                            }
                            {
                                categories.length > 0 &&
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col" className='text-center'>{t('dashboard.name')}</th>
                                            <th scope="col">{t('dashboard.action')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            categories.map((item, i) => {
                                                let { _id, name } = item;
                                                return <tr key={i}>
                                                    <td className=' text-center'><strong>{name}</strong></td>
                                                    <td>
                                                        <button className="btn btn-warning" onClick={() => {
                                                            showModal()
                                                            setCategoryId(_id)
                                                            setInput(name)
                                                        }}>{t('dashboard.edit')}</button>
                                                        <button className="btn btn-danger m-1" onClick={() => {
                                                            deleteCategoryHandler(_id)
                                                        }}>{t('dashboard.delete')}</button>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            }
                            <Modal title="Update Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                <CategoryForm inputHandler={inputHandler} submitHandler={handleOk} input={input} showModal={showModal} />
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory