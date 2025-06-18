import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';

function Signup() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignUp = async(e)=>{
    e.preventDefault();
    // validation implementation here and shhow with toast sooner
     const newErrors = {};

      // Validation
      if (!name.trim()) newErrors.name = "Name is required";
      if (!email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        newErrors.email = "Email is invalid";
      }

      if (!password) {
        newErrors.password = "Password is required";
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (confirmPassword !== password) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      setErrors(newErrors);

      // Show the first error as toast (optional)
      if (Object.keys(newErrors).length > 0) {
        toast.error(Object.values(newErrors)[0]);
        return;
      }
    const payload = {
      name,email,password
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/signup`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(payload)
      });
      const data = await response.json();
      if(response?.status !== 200){
        toast.error(data?.message)
        return
      }
      localStorage.setItem("token",data?.token);
      localStorage.setItem("userInfo",JSON.stringify(data?.userInfo));
      toast.success(data?.message)
      if(data?.userInfo?.role == 'admin'){
        navigate('/admin/dashboard')
      }else{
        navigate('/')
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
  return (
    <div className='w-full md:w-1/2 lg:w-1/3  mx-auto p-5'>
      <div className="border border-gray-300 rounded-md shadow p-5">
        <h3 className='text-center text-3xl font-semibold'>Sign Up Here!</h3>
        <form action="" onSubmit={handleSignUp}>
          <div className='my-5'>
            <label htmlFor="" className='text-gray-800'>Name</label>
            <input type="text" onChange={(e)=>setName(e.target.value)} name="" className="border border-gray-300 rounded-md block w-full" />
          </div>

          <div className='my-5'>
            <label htmlFor="" className='text-gray-800'>Email</label>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} name="" className="border border-gray-300 rounded-md block w-full" />
          </div>

          <div className='my-5'>
            <label htmlFor="" className='text-gray-800'>Password</label>
            <input type="password" onChange={(e)=>setPassword(e.target.value)} name="" className="border border-gray-300 rounded-md block w-full" />
          </div>

          <div className='my-5'>
            <label htmlFor="" className='text-gray-800'>Confirm Password</label>
            <input type="password" onChange={(e)=>setConfirmPassword(e.target.value)} name="" className="border border-gray-300 rounded-md block w-full" />
          </div>

          <button type='submit' className="w-full p-2 text-center bg-black text-white rounded-md">Register</button>
        </form>

          <div className='text-center mt-5'>
            Already have an account? <Link className='underline' to={'/login'}>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup