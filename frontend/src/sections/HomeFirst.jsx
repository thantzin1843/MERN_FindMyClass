import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
function HomeFirst() {
  return (
    // Home page's first page
            <section class=" py-20 text-center px-4">
            <h1 class="text-3xl md:text-6xl font-extrabold text-gray-800 mb-4">
                Discover Training Centers & Courses
            </h1>
            <p class="text-md md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto tracking-tighter">
                Find the best training centers near you and explore a variety of courses to grow your skills.
            </p>
               <form action="" class="max-w-md mx-auto flex items-center gap-1 border border-gray-300 px-5 rounded-xl mt-10">
                    <input 
                    type="text" 
                    placeholder="Search courses or centers..." 
                    class="w-full p-4 rounded-xl border-none outline_none" 

                    />
                    <FaMagnifyingGlass className='text-gray-500 cursor-pointer' size={30} />
               </form>
            </section>
  )
}

export default HomeFirst