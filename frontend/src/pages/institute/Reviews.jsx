import React, { useEffect, useState } from 'react'
import { BsStar } from 'react-icons/bs'

function Reviews() {
    const id = JSON.parse(localStorage.getItem('instituteInfo'))?._id;
    const [reviews, setReviews] = useState([])
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
                },[])
  return (
        <div className='px-10 lg:px-45 '>
        <div className="w-full lg:w-3/4 mx-auto">
            <div className='mt-5 mb-10 '>
            <div className='font-bold text-xl mb-5'>Reviews</div>
            <div className="grid grid-cols-1 lg:grid-cols-3 space-x-10 space-y-10">
               {
                reviews?.map((review)=>(
                     <div className='space-y-3'>
                        <div className="flex items-center gap-3">
                            <img src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" className='w-[50px] h-[50px] border rounded-full' alt="" />
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

          </div>
          </div>
          </div>
  )
}

export default Reviews