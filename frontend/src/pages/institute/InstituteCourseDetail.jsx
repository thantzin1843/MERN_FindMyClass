import React, { useEffect, useState } from 'react'
import { BiCalendar, BiCategory, BiCheckCircle, BiDiamond } from 'react-icons/bi'
import { FaDiamond } from 'react-icons/fa6'
import { GiTeacher } from 'react-icons/gi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import ImageModal from '../../components/ImageModal'

function InstituteCourseDetail() {
    const {id} = useParams();
    const [course, setCourse] = useState([])
    const navigate = useNavigate()
    const fetchCourse = async() =>{
           try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/course/${id}`);
                const data = await res.json();
                console.log(data);
                setCourse(data);
            } catch (error) {
               toast.error(error.message)
            }
       }
    
       useEffect(()=>{
          fetchCourse()
       },[])

        function convertTo12Hour(time24) {
            const [hourStr, minute] = time24.split(':');
            let hour = parseInt(hourStr, 10);
            const ampm = hour >= 12 ? ' PM' : ' AM';
            hour = hour % 12 || 12; // convert 0 to 12 for 12 AM
            return `${hour}:${minute}${ampm}`;
        }

        const changeCourseStatus = async(status, id) =>{
             try {
                            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/course/changeStatus`,{
                              method:'put',
                              headers:{
                                'Content-Type':'application/json',
                                'authorization':`Bearer ${localStorage.getItem('token')}`
                              },
                              body:JSON.stringify({status:status,id:id})
                            });
                            const data = await res.json();
                    } catch (error) {
                      toast.error(error.message)
                    }
        }
  return (
    <div className='px-5 lg:px-30 pt-10'>
        <div className='w-full lg:w-2/3 mx-auto'>
            <div className="flex items-center justify-between gap-2 ">
                <div className='flex gap-2 items-center'>
                <img src={course?.institute_id?.logo} className='w-15 shadow-lg border border-gray-200 rounded-full h-15 ' alt="" />
                <div className='text-xl'>{course?.institute_id?.name}</div>
                </div>

                 <select name="" id="" onChange={(e)=>changeCourseStatus(e.target.value,course?._id)}>
                        <option value="upcoming" selected={course?.status == "upcoming"}>Upcoming</option>
                        <option value="inactive" selected={course?.status == "inactive"}>Inactive</option>
                        <option value="active" selected={course?.status == "active"}>Active</option>
                        <option value="completed" selected={course?.status == "completed"}>Completed</option>
                </select>
            </div>

            {/* <div className="w-full md:w-full mt-5">
                <img src="https://www.greatschools.org/gk/wp-content/uploads/2012/05/Importance-of-class-size.jpg" className=' rounded-md w-full h-[300px] object-cover' alt="" />
            </div> */}

            <ImageModal images={course?.images}/>

            <div className='text-3xl mt-10'>
                {course?.name}
            </div>
            <div className="flex items-center mt-5 gap-5 flex-wrap">
                <div className='text-xl'><GiTeacher className='inline' size={30}/> {course?.instructor?.name}</div>
                <div className='bg-black text-white p-1 px-5 rounded-full flex items-center gap-3'> <div className='w-1 h-1 rounded-full bg-green-500'></div>{course?.type}</div>
                {
                    course?.certificate && (
                        <div className='flex items-center gap-1'>
                            <BiCheckCircle className='text-green-600' size={30}/> Certificate
                        </div>
                    )
                }
                 <div className='p-1 px-5 flex items-center gap-2'>
                      <BiCategory size={25}/> {course?.category}
                </div>
            </div>

            <div className='flex gap-3 items-center my-5'>
                <div className='text-xl'>{course?.current_fee} MMK</div>
                <div className='text-sm line-through text-red-500'>{course?.original_fee} MMK</div>
            </div>

            <div className='my-3'>
                Course duration is <span className='text-xl'>{course?.duration}  months.</span>
                Student limit is <span className='text-xl'> {course?.student_limit}</span>.
            </div>

            <div className='my-5'>
                <BiCalendar size={30} className='inline'/>Start Date: <span className=' text-xl'>
                    {course?.start_date && new Date(course?.start_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).replace(',', '').split(' ').join('-')}
                </span>
            </div>

            <div>Time table</div>
            <table>
                {
                    course?.schedules?.map((schedule)=>(
                    <tr className='border'>
                        <td className='px-5'>{schedule.day}</td>
                        <td className='text-xl px-5'>{convertTo12Hour(schedule.time)}</td>
                    </tr>
                    ))
                }
               
               
            </table>

            <p className='my-5'>
               {course?.about}
            </p>

            <div>
                <div className='text-xl'>Course Contents</div>
                <div className="space-y-3 mt-3">
                    {
                    course?.contents?.map((c)=>(
                        <div className='flex items-center gap-2'>
                           <FaDiamond/> {c}
                        </div>
                    ))
                    }
                </div>
            </div>

            <button onClick={()=>navigate(`/courses/${course?._id}/enroll`)} className='bg-red-500 text-white p-2 rounded-md w-full lg:w-1/3 my-10'>
                Delete
            </button>
        </div>
    </div>
  )
}

export default InstituteCourseDetail