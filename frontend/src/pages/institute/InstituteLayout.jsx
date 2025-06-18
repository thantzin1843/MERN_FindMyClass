import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import InstituteNavbar from '../../components/InstituteNavbar'

function InstituteLayout() {
  const navigate = useNavigate()
  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

     if(userInfo && userInfo?.role == "admin"){
      navigate('/admin/dashboard')
    }

    if(userInfo && userInfo?.role == "user"){
      navigate('/')
    }
  },[])
  return (
    <div>
        <InstituteNavbar/>
        <Outlet/>
    </div>
  )
}

export default InstituteLayout