import React, { useEffect, useState } from 'react'
import CourseCard from '../../components/CourseCard'
import InstituteCourseCard from '../../components/InstituteCourseCard'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

function Courses() {
  const [courses, setCourses] = useState([])
       const instituteInfo = JSON.parse(localStorage.getItem('instituteInfo'))
       const fetchCourses = async(id) =>{
           try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/institute/${id}/courses`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await res.json();
                console.log(data);
                setCourses(data);
            } catch (error) {
               toast.error(error.message)
            }
       }
    
       useEffect(()=>{
          fetchCourses(instituteInfo?._id)
       },[])
  return (
     <div className='px-5 lg:px-45 '>
        <div className="w-full lg:w-3/4 mx-auto">
          <div className='mt-20 lg:mt-10 '>
           <div className="flex justify-between mb-10">
             <div className='font-bold text-xl mb-5'>Courses</div>
                  <div>
                     <Link to={'/institute/create/course'}  className='bg-black py-2 px-5 rounded-lg text-white'>Create Course</Link>
                  </div>
           </div>
            {/* <div className="grid grid-cols-1 lg:grid-cols-3 space-x-5 space-y-10">
               {
                courses?.map((course,index)=>(
                    <InstituteCourseCard key={index} course={course}/>
                ))
               }

            </div> */}
           <div className='rounded-md overflow-scroll lg:overflow-hidden '>
             <table className='w-full '>
               <thead>
                  <tr className='border-b bg-gray-200'>
                     <td className='p-2'>Name</td>
                     <td className='p-2'>Start Date</td>
                     <td className='p-2'>Fee(Ks) </td>
                     <td className='p-2'>duration</td>
                     <td className='p-2'>status</td>
                     <td className='p-2'>Enrolled Students</td>
                     <td className='p-2'>Operation</td>
                  </tr>
               </thead>
               <tbody>
                  {
                     courses?.map((course,index)=>(
                     <tr key={index}>
                        <td className='p-2'>
                           <Link to={`/institute/courses/${course?._id}`}>{course?.name}</Link>
                        </td>
                        <td className='p-2'>{new Date(course?.start_date).toLocaleDateString()}</td>
                        <td className='p-2'>{course?.current_fee}</td>
                        <td className='p-2'>{course?.duration}</td>
                        <td className='p-2'>
                           <span className='bg-yellow-400 p-1 rounded-full text-xs px-3'>{course?.status}</span>
                        </td>
                        <td className='p-2'>
                           <Link to={`/institute/courses/${course?._id}/enrolled_students`} className='text-blue-500 underline text-sm'>Enrolled Students</Link>
                        </td>
                        <td className='p-2'>
                           <button className='bg-red-600 text-white py-2 px-5 rounded-md text-xs me-2'>Delete</button>
                           
                           {/* <button className='bg-black text-white py-2 px-5 rounded-md text-xs '>Edit</button> */}
                        </td>
                     </tr>
                     ))
                  }
                  
               </tbody>
            </table>
           </div>
            

          </div>
        </div>

    </div>
  )
}

export default Courses