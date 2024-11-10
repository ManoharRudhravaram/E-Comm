import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../../Spinner'
import { host, useAuth } from '../../../Context/AuthContext'

function AdminProtectedRoute() {
  let [oK, setOk] = useState(false)
  let { auth } = useAuth()
  async function isAdmin() {
    let res = await axios.get(`${host}/api/v1/admin-auth-route`, { headers: { Authorization: auth?.token } });
    let data = await res.data;
    if (data.ok) {
      setOk(data.ok)
    }
  }
  useEffect(() => {
    isAdmin()
  }, [])
  return oK ? <Outlet /> : <Spinner path='/'/>
}

export default AdminProtectedRoute