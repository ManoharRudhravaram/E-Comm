import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { host, useAuth } from '../../../Context/AuthContext'
import { Outlet } from 'react-router-dom';
import Spinner from '../../Spinner';

function ProtectedRoute() {
    let { auth } = useAuth();
    let [ok, setOk] = useState(false);

    //to access dashboard
    async function isValidUser() {
        let res = await axios.get(`${host}/api/v1/auth-user`, { headers: { Authorization: auth.token } })
        let data = res.data;
        if (data.ok) {
            setOk(data.ok)
        }
    }
    useEffect(() => {
        if (auth.token) {
            isValidUser()
        }
    }, [ok, auth])

    return ok ? <Outlet /> : <Spinner />
}

export default ProtectedRoute