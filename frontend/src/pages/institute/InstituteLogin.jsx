import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';

function InstituteLogin() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async(e)=>{
    e.preventDefault();
    // validation implementation here and shhow with toast sooner
     const newErrors = {};

      // Validation
      if (!email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        newErrors.email = "Email is invalid";
      }

      if (!password) {
        newErrors.password = "Password is required";
      }

      // Show the first error as toast (optional)
      if (Object.keys(newErrors).length > 0) {
        toast.error(Object.values(newErrors)[0]);
        return;
      }
    const payload = {
        email,password
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/institute/login`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(payload)
      });
      const data = await res.json();
       if(res.status == 201){
              toast.success(data?.message)
              if(localStorage.getItem('userInfo')) localStorage.removeItem('userInfo')
              localStorage.setItem("instituteInfo",JSON.stringify({
                _id:data?.institute?._id,
                role:data?.institute?.role,
                status:data?.institute?.status
              }))
              localStorage.setItem("token",data?.token)
              navigate('/institute/dashboard')
            }
            toast.error(data.message)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return (
    <div className='w-full md:w-1/2 lg:w-1/3  mx-auto p-5'>
      <div className="border border-gray-300 rounded-md shadow p-5">
        <h3 className='text-center text-3xl font-semibold'>Institute Login Here!</h3>
        <form onSubmit={handleLogin}>
          <div className='my-5'>
            <label htmlFor="" className='text-gray-800'>Email</label>
            <input type="email" name="" onChange={(e)=>setEmail(e.target.value)} className="border border-gray-300 rounded-md block w-full" />
          </div>
          <div className='my-5'>
            <label htmlFor="" className='text-gray-800'>Password</label>
            <input type="password" name="" onChange={(e)=>setPassword(e.target.value)} className="border border-gray-300 rounded-md block w-full" />
          </div>
          <button type='submit' className="w-full p-2 text-center bg-black text-white rounded-md">Login</button>
        </form>

        <div className='text-center mt-5'>
           Do you want to create a new institute? <Link className='underline' to={'/institute/signup1'}>Go to create new institute</Link>
        </div>
      </div>
    </div>
  )
}

export default InstituteLogin