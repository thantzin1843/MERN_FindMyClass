import React from 'react'
import { BiPhone } from 'react-icons/bi'
import { CiLocationOn } from 'react-icons/ci'
import { MdEmail, MdPhoto } from 'react-icons/md'
import ImageModal from '../components/ImageModal'
import InstructorModal from '../components/InstructorModal'
import { BsStar } from 'react-icons/bs'
import ReviewModal from '../components/ReviewModal'
import CourseCard from '../components/CourseCard'


function SchoolDetail() {
  return (
    <div className='px-5 lg:px-20 '>
        <div className="w-full lg:w-2/3 mt-10 mx-auto">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTComBxCbdkdSpHqAnQngEPdOckocvxj3fDPQ&s" className='w-20 border rounded-full h-20 ' alt="" />
            <div className="flex items-center mb-2 mt-5 gap-5">
                <div className='text-3xl '>Code Lab </div>
                <div className="p-1 px-5 bg-orange-500 text-white rounded-md">
                    Technology
                </div>
            </div>


           <div className="flex gap-5 mb-2 flex-wrap">
                <div className='flex items-center gap-2'>
                    <BiPhone size={25}/><span className=''>0912384843</span> <span className=''>0912384843</span> <span className=''>0912384843</span> 
                </div>
                <div className='flex items-center gap-2'>
                    <MdEmail size={25}/><span>codelab@gmail.com</span>
                </div>
           </div>

           <div className='flex items-center mb-5'>
            <CiLocationOn size={25}/>No.123 Building 1, Yangon, Mingaladon Township
           </div>

           <ImageModal/>

           

            <p className='mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nisi officiis ipsa fuga debitis quo similique, alias sunt ut obcaecati quaerat? Nulla accusantium nisi consequuntur illo incidunt reprehenderit corporis pariatur.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, illum, laboriosam non voluptate recusandae nam minus laborum repellat dolorem rem perferendis amet aliquid velit corrupti. Soluta quisquam provident nisi suscipit.
            </p>
          
          <div className='mt-5 mb-10 '>
            <div className='font-bold text-xl mb-5'>Members</div>
            <div className="grid grid-cols-2 lg:grid-cols-3 space-x-5 space-y-10">
               {
                [1,2,3].map(()=>(
                     <div className='space-y-3'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTComBxCbdkdSpHqAnQngEPdOckocvxj3fDPQ&s" className='w-[100px] h-[100px] border rounded-full' alt="" />
                        <div>
                            <div className='text-xl'>Thant Zin Win</div>
                            <div className='text-sm textgry'>thant@gmail.com</div>
                            <div className='text-sm textgry'>09456738383</div>
                            <div className='font-bold text-red-500 text-sm'>Chief Information Officer</div>
                            <div className=' text-sm'>B.C.Sc (Software Engineering) <br /> 
                            M.C.Sc(Knowledge Enginnering) </div>
                        </div>
                    </div>
                ))
               }

            </div>
            <InstructorModal/>

          </div>

          <div className='mt-5 mb-10 '>
            <div className='font-bold text-xl mb-5'>Reviews</div>
            <div className="grid grid-cols-1 lg:grid-cols-3 space-x-10 space-y-10">
               {
                [1,2].map(()=>(
                     <div className='space-y-3'>
                        <div className="flex items-center gap-3">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTComBxCbdkdSpHqAnQngEPdOckocvxj3fDPQ&s" className='w-[50px] h-[50px] border rounded-full' alt="" />
                            <div className='text-xl'>
                                <div>Thant Zin Win</div>
                                <div className='space-x-1'>{
                                    [1,2,3,4,5].map(()=><BsStar className='inline '/>)
                                    } </div>
                            </div>
                        </div>
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur voluptas officiis ducimus, odio deserunt, facilis vero excepturi nobis officia neque commodi distinctio veritatis cupiditate sed provident veniam incidunt voluptatibus ab.
                        </div>
                    </div>
                ))
               }

            </div>
            <ReviewModal/>

          </div>

          <div className='mt-5 mb-10 '>
            <div className='font-bold text-xl mb-5'>Courses</div>
            <div className="grid grid-cols-1 lg:grid-cols-3 space-x-5 space-y-10">
               {
                [1,2,3,3,3,3,3,3].map(()=>(
                    <CourseCard/>
                ))
               }

            </div>
            

          </div>
        </div>

    </div>
  )
}

export default SchoolDetail