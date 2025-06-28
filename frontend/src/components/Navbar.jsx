import React, { useEffect, useState, useRef } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { CiMenuBurger } from 'react-icons/ci'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const handleSignOut = () =>{
      localStorage.removeItem("token")
      localStorage.removeItem("userInfo")
      navigate('/')
    }

useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div>
        {/* navbar for desktop */}
        <div className="flex justify-between px-5 md:px-15 items-center h-[75px]">
            <div className="logo text-xl md:text-3xl">
                FindMyClass
            </div>
            <nav className='hidden md:flex md:items-center space-x-10 '>
                <Link to={'/'}>Home</Link>
                <Link to={'/schools'}>Training School</Link>
                <Link to={'/courses'}>Courses</Link>
                
                {
                    (localStorage.getItem('userInfo') && localStorage.getItem('token')) ? '' : <Link to={'/login'} className='bg-black text-white p-2 rounded-md '>Login</Link>
                }


            

                 <div className="relative inline-block text-left" ref={dropdownRef}>
                <div className={(localStorage.getItem('userInfo') && localStorage.getItem('token')) ? 'block' : 'hidden'}>
                    <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden focus:outline-none"
                    >
                    <img
                        // src="https://i.pravatar.cc/100" // Replace with user profile URL
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRPx77U9mERU_T1zyHcz9BOxbDQrL4Dvtg&s'
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                    </button>
                </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black/5 z-10">
            <div class="px-4 py-3 text-sm text-black ">
                <div className='font-bold'>{localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).name}Thant Zin Win</div>
                <div class="text-sm truncate">{localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).email}ThantZinwin@gmial.com</div>
            </div>
          <div className="py-1">
            <a
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </a>
             <Link to={'/institute/login'} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My School</Link>
               <Link to={'/enrolled_courses'} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Enrolled Courses</Link>
               {
                        JSON.parse(localStorage.getItem('userInfo'))?.role == 'admin' && (
                             
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Dashboard</a>
                           
                        )
                    } 
            <button
              onClick={()=>handleSignOut()}
              className=" w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
            >
             <BiLogOut size={20} /> Logout
            </button>
          </div>
        </div>
      )}
    </div>


            </nav>

           <div className='inline-block md:hidden'>
             <div onClick={()=>setOpen(!open)} className='inline-block md:hidden hover:bg-gray-200 hover:rounded-md p-1 cursor-pointer'>
                <CiMenuBurger size={30}/>
            </div>



                 <div className="relative inline-block text-left" ref={dropdownRef}>
                <div className={(localStorage.getItem('userInfo') && localStorage.getItem('token')) ? 'block' : 'hidden'}>
                    <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden focus:outline-none"
                    >
                    <img
                        // src="https://i.pravatar.cc/100" // Replace with user profile URL
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRPx77U9mERU_T1zyHcz9BOxbDQrL4Dvtg&s'
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                    </button>
                </div>

                {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black/5 z-10">
                        <div class="px-4 py-3 text-sm text-black ">
                            <div className='font-bold'>{localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).name}Thant Zin Win</div>
                            <div class="text-sm truncate">{localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).email}ThantZinwin@gmial.com</div>
                        </div>
                    <div className="py-1">
                        <a
                        href="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                        Profile
                        </a>
                        <Link to={'/institute/login'} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My School</Link>
                        <Link to={'/enrolled_courses'} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Enrolled Courses</Link>
                        {
                                    JSON.parse(localStorage.getItem('userInfo'))?.role == 'admin' && (
                                        
                                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Dashboard</a>
                                    
                                    )
                                } 
                        <button
                        onClick={()=>handleSignOut()}
                        className=" w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                        <BiLogOut size={20} /> Logout
                        </button>
                    </div>
                    </div>
                )}
                </div>
           </div>
        </div>

        {/* Side Nav Bar */}
        <div className={`fixed top-0 left-0 h-screen bg-primary shadow-lg w-2/3 z-50 flex flex-col p-15
            transform duration-300 transition-transform ${!open ? '-translate-x-full' :'translate-x-0'}
            `}>
            <div className="logo text-3xl md:text-3xl py-5">
                FindMyClass
            </div>
            <nav className='flex flex-col space-y-5'>
                <Link to={'/'}>Home</Link>
                <Link to={'/schools'}>Training School</Link>
                <Link to={'/courses'}>Courses</Link>
                <Link to={'/'}>Profile</Link>
            </nav>

            {
                localStorage.getItem('token') ? (
                    <button className='bg-black text-white py-2 rounded-md mt-5 flex items-center justify-center gap-3 cursor-pointer' onClick={()=>handleSignOut()}><BiLogOut size={20}/> Sign Out</button>
                ):(
                    <button className='bg-black text-white py-2 rounded-md mt-5 flex items-center justify-center gap-3 cursor-pointer' onClick={()=>navigate('/login')}><BiLogOut size={20}/> Login</button>
                )
            }
        </div>
    </div>
  )
}

export default Navbar


