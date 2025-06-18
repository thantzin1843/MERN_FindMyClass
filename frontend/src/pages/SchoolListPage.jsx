import React from 'react'
import SchoolCard from '../components/SchoolCard'
import { FaMagnifyingGlass } from 'react-icons/fa6'

function SchoolListPage() {
  return (
    <div className='px-10 md:px-20'>

        <div className="flex justify-between items-center flex-wrap my-10">
            <div>
                Search results for: <span className='font-semibold'>CodeL</span>
            </div>
            <form action="" className='flex items-center space-x-1  w-full md:w-1/3'>
                <input type="text" className='p-2 border rounded-md w-full' placeholder='Search schools'/>
                <button className='bg-black text-white p-3 rounded-md'><FaMagnifyingGlass/> </button>
            </form>

        </div>
        
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 space-x-5 space-y-5">
            {
            [1,2,3,4,4,5,55,5,4,4,4,4].map(()=>(
                <SchoolCard/>
            ))
             }
        </div>
    </div>
  )
}

export default SchoolListPage