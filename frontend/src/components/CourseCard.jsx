import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function CourseCard({course}) {
    console.log(course)
    const navigate = useNavigate()
      function convertTo12Hour(time24) {
            const [hourStr, minute] = time24.split(':');
            let hour = parseInt(hourStr, 10);
            const ampm = hour >= 12 ? ' PM' : ' AM';
            hour = hour % 12 || 12; // convert 0 to 12 for 12 AM
            return `${hour}:${minute}${ampm}`;
        }

        const navigateEnrollPage = (id) =>{
            if(localStorage.getItem("userInfo")){
                navigate(`/courses/${id}/enroll`)
            }else{
                navigate('/login')
            }
        }
  return (
      <div className='relative min-w-[100%] sm:min-w-[35%] lg:min-w-[25%] border border-gray-300'>
            <Link to={`/courses/${course?._id}`}>
                        <div className="w-full h-[200px]">
                            <img src={course?.images?.[0]} className='w-full h-full object-cover' alt="" />
                        </div>
                </Link>
                       <div className="p-3 space-y-1">
                            <div className='line-clamp-2 font-bold text-xl'>
                                {course?.name}
                            </div>
                            <div className=' text-gray-800'>
                                <span className=''>{course?.instructor?.name}</span>
                            </div>
                            <div className="flex gap-2">
                                <div className='font-bold'>
                                    {course?.current_fee} Ks
                                </div>
                                <div className=' line-through text-red-500'>
                                    {course?.original_fee} Ks
                                </div>
                            </div>
                           <div className="mt-3">
                             <button onClick={()=>navigateEnrollPage(course?._id)} className='bg-black text-white py-2 px-5  rounded-md'>Enroll Now</button>
                           </div>
                       </div>

                       <div className="absolute flex top-0 left-0 justify-between w-full items-center">
                        <img src={course?.institute_id?.logo} className='w-12 h-12' alt="" />
        
                       <div className='bg-black text-white px-2'>
                        {course?.start_date && new Date(course?.start_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).replace(',', '').split(' ').join('-')}
                       </div>
                       </div>
                    </div>
  
  )
}

export default CourseCard