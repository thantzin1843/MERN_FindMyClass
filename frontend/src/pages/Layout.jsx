import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Layout() {
  const navigate = useNavigate()
  useEffect(()=>{
    const instituteInfo = JSON.parse(localStorage.getItem("instituteInfo"));
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(instituteInfo && instituteInfo?.status == "active"){
      navigate('/institute/dashboard')
    }

    if(userInfo && userInfo?.role == "admin"){
      navigate('/admin/dashboard')
    }
  },[])


  return (
    <div className="m-0 p-0">
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout