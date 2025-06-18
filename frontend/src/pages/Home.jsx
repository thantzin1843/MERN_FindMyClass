import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import HomeFirst from '../sections/HomeFirst'
import PopularCourses from '../components/PopularCourses'


function Home() {
  return (
        <div className='px-10 md:px-20'>
            <HomeFirst/>
            <PopularCourses/>
        </div>
  )
}

export default Home