import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminDashboardMenu from '../../Components/AdminDashboardMenu'
import axios from 'axios'
import { host, useAuth } from '../../Context/AuthContext'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

function Users() {
    const { t } = useTranslation();
    let { auth } = useAuth();
    let [allusers, setAllUsers] = useState([]);
    async function getAllusers() {
        let { data } = await axios.get(`${host}/api/v1/allusers`, { headers: { Authorization: auth.token } })
        setAllUsers(data.allUsers)
    }

    let changeRoleHandler = async (id, currentRole) => {
        try {
            const newRole = !currentRole; // Toggle the role
            let { data } = await axios.post(`${host}/api/v1/editusers/${id}`, { role: newRole }, { headers: { Authorization: auth.token } });
            toast(data.message);
            // Update the role in the local state only after a successful response from the server
            if (data.success) {
                setAllUsers(prevUsers =>
                    prevUsers.map(user => user._id === id ? { ...user, role: newRole } : user)
                );
            }
        } catch (error) {
            toast(`⚡${error.message}`, { style: { color: "white", backgroundColor: "red" } })
        }
    }
    useEffect(() => {
        getAllusers()
    }, [])

    return (
        <Layout title={"All Users - Annoy"}>
            <div className="container">
                <h1 className='text-center mt-3 mb-2'>{t('dashboard.admin')}</h1>
                <div className="row">
                    <div className="col-md-3">
                        <AdminDashboardMenu />
                    </div>
                    <div className="col-md-9">
                        <h3 className='text-center'>{t('dashboard.allUsers')}</h3>
                        <div className="row m-2 ">
                            <table className="table " >
                                <thead>
                                    <tr><th scope='col'>#</th>
                                        <th scope="col">{t('dashboard.userName')}</th>
                                        <th scope="col">{t('dashboard.email')}</th>
                                        <th scope="col">{t('dashboard.contact')}</th>
                                        <th scope="col">{t('dashboard.role')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allusers.length == 0 && <h6>{t('dashboard.nop')}</h6>}
                                    {allusers.length > 0 &&
                                        allusers?.map((user, i) => {
                                            return (
                                                <>
                                                    <tr key={i} className="mb-2">
                                                        <td>{i + 1}</td>
                                                        <td>{user?.name}</td>
                                                        <td>{user?.email}</td>
                                                        <td>{user?.phone}</td>
                                                        <td>{user?.role == true ? "Admin" : "User"}</td>
                                                        <button style={{ border: "none" }} onClick={() => { changeRoleHandler(user._id, user.role) }}><i class="fa-solid fa-pen-to-square"></i></button>
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
            </div>
        </Layout>
    )
}

export default Users