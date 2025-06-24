import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminNavbar from '../../components/AdminNavbar';

function AdminLayout() {
  const navigate = useNavigate()
  useEffect(()=>{
    const instituteInfo = JSON.parse(localStorage.getItem("instituteInfo"));
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(instituteInfo && instituteInfo?.status == "active"){
      navigate('/institute/dashboard')
    }

    if(userInfo && userInfo?.role == "user"){
      navigate('/')
    }

    if(!localStorage.getItem('token')){
      navigate('/')
    }
  },[])

  
  return (
    <>
        <AdminNavbar/>
        <Outlet/>
    </>
  )
}

export default AdminLayout