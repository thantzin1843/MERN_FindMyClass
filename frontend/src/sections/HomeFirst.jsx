import React, { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
function HomeFirst() {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState("")
  const handleSearch = async(e)=>{
    e.preventDefault();
    navigate(`/courses?search=${searchText}`)
  }
  return (
    // Home page's first page
            <section class=" py-20 text-center px-4">
            <h1 class="text-3xl md:text-6xl font-extrabold text-gray-800 mb-4">
                Discover Training Centers & Courses
            </h1>
            <p class="text-md md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto tracking-tighter">
                Find the best training centers near you and explore a variety of courses to grow your skills.
            </p>
               <form onSubmit={handleSearch} class="max-w-md mx-auto flex items-center gap-1 border border-gray-300 px-5 rounded-xl mt-10">
                    <input value={searchText} onChange={(e)=>setSearchText(e.target.value)}
                    type="text" 
                    placeholder="Search courses ..." 
                    class="w-full p-4 rounded-xl border-none outline_none" 

                    />
                    <button><FaMagnifyingGlass className='text-gray-500 cursor-pointer' size={30} /></button>
               </form>
            </section>
  )
}

export default HomeFirst