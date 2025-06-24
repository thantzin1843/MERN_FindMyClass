import React, { useState } from 'react'
import { BiLogOut, BiMenu } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

function AdminNavbar() {
    const [show, setShow] = useState(false)
     const navigate = useNavigate()
    const handleSignOut = () =>{
      localStorage.removeItem("token")
      localStorage.removeItem("userInfo")
      navigate('/')
    }
  return (
    <div>
        <div className="flex justify-end fixed top-5 right-5 z-10">
            <BiMenu size={40} className=' hover:scale-110 cursor-pointer' onClick={()=>setShow(!show)}/>
        </div>
        <div className={`z-50 fixed top-0 left-0 w-3/5 md:w-1/5 h-screen bg-gray-300 transform transition-transform duration-300 ${show ? 'translate-x-0' : '-translate-x-full'}`}>
        
         <div className='flex p-10 flex-col'>
           <div className='text-3xl '>Find My Class</div>
          <nav className='flex flex-col space-y-5 mt-10'>
            <Link to={'/admin/dashboard'}>Dashboard</Link>
            <Link to={'/admin/dashboard'}>Institutes</Link>
          </nav>
          <button className='bg-black text-white py-2 rounded-md mt-5 flex items-center justify-center gap-3 cursor-pointer' onClick={()=>handleSignOut()}><BiLogOut size={20}/> Sign Out</button>
         </div>
        </div>
    </div>
  )
}

export default AdminNavbar