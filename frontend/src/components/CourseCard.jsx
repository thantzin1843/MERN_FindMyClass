import React from 'react'
import { Link } from 'react-router-dom'

function CourseCard({course}) {
  return (
    <Link to={`/courses/${course?._id}`}>
        <div className='relative min-w-[100%] sm:min-w-[35%] lg:min-w-[25%] border border-gray-300'>
                        <div className="w-full h-[200px]">
                            <img src={course?.images?.[0]} className='w-full h-full object-cover' alt="" />
                        </div>

                       <div className="p-3 space-y-1">
                            <div className='line-clamp-2 font-semibold'>
                                {course?.name}
                            </div>
                            <div className=' text-gray-800'>
                                By <span className='font-bold'>{course?.instructor?.name}</span>
                            </div>
                            <div className="flex gap-2">
                                <div className='font-bold'>
                                    {course?.current_fee} Ks
                                </div>
                                <div className=' line-through'>
                                    {course?.original_fee} Ks
                                </div>
                            </div>
                            <button className='bg-black text-white py-1 px-5 rounded-md'>Enroll Now</button>
                       </div>

                       <div className="absolute flex top-0 left-0 justify-between w-full items-center">
                        <img src={course?.institute_id?.logo} className='w-12 h-12' alt="" />
        
                       <div className='bg-orange-500 px-2'>12-June-2025</div>
                       </div>
                    </div>
    </Link>
  )
}

export default CourseCard