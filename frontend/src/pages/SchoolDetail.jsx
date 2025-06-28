import React, { useEffect, useState } from 'react'
import { BiPhone } from 'react-icons/bi'
import { CiLocationOn } from 'react-icons/ci'
import { MdEmail, MdPhoto } from 'react-icons/md'
import ImageModal from '../components/ImageModal'
import InstructorModal from '../components/InstructorModal'
import { BsStar } from 'react-icons/bs'
import ReviewModal from '../components/ReviewModal'
import CourseCard from '../components/CourseCard'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'


function SchoolDetail() {
    const {id} = useParams();
    const [institute, setInstitute] = useState([])
    const [staffs, setStaffs] = useState([])
    const [courses, setCourses] = useState([])
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInstitute = async() =>{
           try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/institute/user/${id}`);
                const data = await res.json();
                console.log(data);
                setInstitute(data?.institute);
                setCourses(data?.courses);
                setStaffs(data?.members)
            } catch (error) {
               toast.error(error.message)
            }
       }

        const fetchReviews = async () => {
               try {
                   const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${id}`);
                   const data = await res.json();
                   console.log(data)
                   setReviews(data);
               } catch (error) {
                   console.error("Failed to fetch reviews:", error.message);
               } finally {
                   setLoading(false);
               }
               };

            useEffect(()=>{
                fetchReviews();
                fetchInstitute()
            },[])
       
           if (loading) return <p>Loading reviews...</p>;
           if (reviews.length === 0) return <p>No reviews yet.</p>;
    
  

  return (
    <div className='px-5 lg:px-20 '>
        <div className="w-full lg:w-2/3 mt-10 mx-auto">
            <img src={institute?.logo} className='w-20 border rounded-full h-20 ' alt="" />
            <div className="flex items-center mb-2 mt-5 gap-5 flex-wrap">
                <div className='text-3xl '>{institute?.name}</div>
                <div className="p-1 px-5 bg-orange-500 text-white rounded-md">
                    {institute?.category}
                </div>
            </div>


           <div className="flex gap-5 mb-2 flex-wrap">
                <div className='flex items-center gap-2'>
                    <BiPhone size={25}/>
                    {
                        institute?.phone?.map((p,index)=>(
                            <span className='' key={index}>{p}, </span>
                        ))
                    }
                </div>
                <div className='flex items-center gap-2'>
                    <MdEmail size={25}/><span>{institute?.email}</span>
                </div>
           </div>

           <div className='flex items-center mb-5'>
            <CiLocationOn size={25}/>{institute?.address}
           </div>

           <ImageModal images={institute?.images}/>

           

            <p className='mt-5'>
                {institute?.about}
            </p>
          
          <div className='mt-5 mb-10 '>
            <div className='font-bold text-xl mb-5'>Members</div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 space-y-10">
               {
                staffs?.map((staff,index)=>(
                     <div className='space-y-3' key={index}>
                        <img src={staff?.profile} className='w-[100px] h-[100px] border rounded-full object-cover object-center' alt="" />
                        <div>
                            <div className='text-xl'>{staff?.name}</div>
                            <div className='text-sm textgry'>{staff?.email}</div>
                            <div className='text-sm textgry'>{staff?.phone?.map((p)=><span>{p}, </span>)}</div>
                            <div className='font-bold text-red-500 text-sm'>{staff?.position}</div>
                            <div className=' text-sm'>
                                {
                                    staff?.education?.map((edu)=>(
                                        <div>{edu}</div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ))
               }

            </div>
            <InstructorModal staffs={staffs}/>

          </div>

          <div className='mt-5 mb-10 '>
            <div className='font-bold text-xl mb-5'>Reviews</div>
            <div className="grid grid-cols-1 lg:grid-cols-3 space-x-10 space-y-10">
               {
                reviews?.slice(0,2)?.map((review)=>(
                     <div className='space-y-3'>
                        <div className="flex items-center gap-3">
                            <img src={"https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"} className='w-[50px] h-[50px] border rounded-full' alt="" />
                            <div className='text-xl'>
                                <div>{review?.user_id?.name}</div>
                                <div className="text-sm">{review?.user_id?.email}</div>
                                <div className='space-x-1'>{
                                    [1,2,3,4,5].map((r)=><BsStar className='inline ' color={r <= review?.rating && 'red'}/>)
                                    } </div>
                            </div>
                        </div>
                        <div>
                            {review?.comment}
                        </div>
                    </div>
                ))
               }

            </div>
            {
                reviews?.length > 2 && <ReviewModal reviews={reviews}/>
            }
          </div>

          <div className='mt-5 mb-10 '>
            <div className='font-bold text-xl mb-5'>Courses</div>
            <div className="grid grid-cols-1 lg:grid-cols-3 space-x-5 space-y-10">
               {
                courses?.map((course,index)=>(
                    <CourseCard key={index} course={course}/>
                ))
               }

            </div>
            

          </div>
        </div>

    </div>
  )
}

export default SchoolDetail