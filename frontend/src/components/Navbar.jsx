import React, { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { CiMenuBurger } from 'react-icons/ci'
import { Link, Navigate } from 'react-router-dom'

function Navbar() {
    const [open, setOpen] = useState(false)
  return (
    <div>
        {/* <div className='text-center py-3 '>Start Your Training Journey Today!</div> */}

        {/* navbar for desktop */}
        <div className="flex justify-between px-5 md:px-15 items-center h-[75px]">
            <div className="logo text-xl md:text-3xl">
                FindMyClass
            </div>
            <nav className='hidden md:flex md:items-center space-x-10 '>
                <Link to={'/'}>Home</Link>
                <Link to={'/schools'}>Training School</Link>
                <Link to={'/courses'}>Courses</Link>

                
                <button  id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" class="inline text-sm bg-gray-800 rounded-full md:me-0" type="button">
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRPx77U9mERU_T1zyHcz9BOxbDQrL4Dvtg&s" alt="user photo"/>
                </button>


                <div id="dropdownAvatar" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 text-black">
                    <div class="px-4 py-3 text-sm text-black dark:text-black">
                    <div>Bonnie Green</div>
                    <div class="font-medium truncate">name@flowbite.com</div>
                    </div>
                    <ul class="py-2 text-sm text-black dark:text-black" aria-labelledby="dropdownUserAvatarButton">
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
                    </li>
                    <li>
                        <Link to={'/institute/login'} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My Schools</Link>
                    </li>
                   
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Admin Dashboard</a>
                    </li>
                    </ul>
                    <div class="py-2">
                    <a href="#" class="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-black dark:hover:text-white">Sign out</a>
                    </div>
                </div>


                
            </nav>

           <div className='inline-block md:hidden'>
             <div onClick={()=>setOpen(!open)} className='inline-block md:hidden hover:bg-gray-200 hover:rounded-md p-1 cursor-pointer'>
                <CiMenuBurger size={30}/>
            </div>

              <button id="dropdownUserAvatarButton1" data-dropdown-toggle="dropdownAvatar1" class="inline text-sm bg-gray-800 rounded-full md:me-0" type="button">
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRPx77U9mERU_T1zyHcz9BOxbDQrL4Dvtg&s" alt="user photo"/>
                </button>


                <div id="dropdownAvatar1" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 text-black">
                    <div class="px-4 py-3 text-sm text-black dark:text-black">
                    <div>Bonnie Green</div>
                    <div class="font-medium truncate">name@flowbite.com</div>
                    </div>
                    <ul class="py-2 text-sm text-black dark:text-black" aria-labelledby="dropdownUserAvatarButton1">
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
                    </li>
                    <li>
                        <Link to={'/institute/login'} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My Schools</Link>
                    </li>
                 
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Admin Dashboard</a>
                    </li>
                    </ul>
                    <div class="py-2">
                    <a href="#" class="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-black dark:hover:text-white">Sign out</a>
                    </div>
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
        </div>
    </div>
  )
}

export default Navbar