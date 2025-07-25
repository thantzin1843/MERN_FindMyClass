// import axios from 'axios'
import React, { useState } from 'react'
import { FiPhoneCall } from 'react-icons/fi'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

function Footer() {
  const [email,setEmail] = useState("");
  const handleSubscribe = async(e)=>{
    e.preventDefault();
    if(!email){
      toast.error("Please fill your email",{
          duration:1000,
      });
    }

    try {
      // const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/subscriber/save`,{email})
      // toast.success(response?.data?.message)
    } catch (error) {
      toast.error(error.response.data)
    }
  }
  return (
    <footer className='border-t py-12 px-12 mt-10'>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h3 className='text-lg text-gray-800 mb-4'>Newsletter</h3>
          <p className='text-gray-500 mb-4'>
            Be the first to know about our latest courses, exclusive offers, and upcoming events.
Join our newsletter and enjoy 10% off your first enrollment.
          </p>
          {/* <p className='font-medium text-sm text-gray-600 mb-6'>
            Sign up and get 10% off your first order.
          </p> */}

          {/* new letter form */}
          <form onSubmit={handleSubscribe} className='flex'>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} name="" placeholder='Enter your email' className='p-3 w-full text-sm border border-gray-300 rounded-l-md 
            focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all' id="" />
            <button type='submit' className='py-3 rounded-r-md hover:bg-gray-800 transition-all bg-black text-white px-6'>Subscribe</button>
          </form>
        </div>

        {/* shop links */}
        {/* <div>
          <h3 className='text-lg text-gray-800 mb-4 '>Shop</h3>
          <ul className='space-y-2 text-gray-600'>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">Men's Top Wear</Link>

            </li>

            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">Women's Top Wear</Link>

            </li>

            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">Men's Bottom Wear</Link>

            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">Women's Top Wear</Link>

            </li>
          </ul>
        </div> */}


                {/* support links */}
        <div className='lg:mx-auto'>
          <h3 className='text-lg text-gray-800 mb-4 '>Support</h3>
          <ul className='space-y-2 text-gray-600'>
             <li>
              <Link to="/" className="hover:text-gray-600 transition-colors">Home</Link>

            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">Contact Us</Link>

            </li>

            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">About Us</Link>

            </li>

            <li>
              <Link to="/courses" className="hover:text-gray-600 transition-colors">Courses</Link>

            </li>
            <li>
              <Link to="/schools" className="hover:text-gray-600 transition-colors">Training Centers</Link>

            </li>
          </ul>
        </div>

        {/* Follow us */}
        <div>
          <h3>Follow Us</h3>
          <div className='flex items-center space-x-5 mb-6 mt-1'>
            <a href="" rel='noopener noreferer' className='hover:text-gray-300'>
              <TbBrandMeta className='w-6 h-6 '/>
            </a>

            <a href="" rel='noopener noreferer' className='hover:text-gray-300'>
              <IoLogoInstagram className='w-6 h-6 '/>
            </a>

            <a href="" rel='noopener noreferer' className='hover:text-gray-300'>
              <RiTwitterLine className='w-6 h-6 '/>
            </a>
          </div>
          <p className='text-gray-500'>Call us</p>
          <p><FiPhoneCall className='inline-block mr-2'/>
          09-445068826</p>
        </div>
      </div>

      <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
<p className='text-gray-500 text-sm tracking-tighter text-center'>Copyright 2025 ThantZinWin . All rights Reserved.</p>
      </div>

    </footer>
  )
}

export default Footer