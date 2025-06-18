import React from 'react'
import { Link } from 'react-router-dom'

function InstitutePending() {
  return (
    <div className='flex justify-center items-center w-full h-screen flex-col'>
        <div className='text-5xl font-bold text-center'>Admin team will approve your institute within 24Hours.</div>
        <Link to={'/'} className='bg-black p-2 mx-auto text-white w-1/5 text-center mt-15 rounded-md'>Ok</Link>
    </div>
  )
}

export default InstitutePending