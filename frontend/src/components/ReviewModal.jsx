import React, { useEffect, useState } from 'react'
import { BsStar } from 'react-icons/bs'
import { FcNext, FcPrevious } from 'react-icons/fc'
import { IoCloseCircle } from 'react-icons/io5'
import { MdPhoto } from 'react-icons/md'

function ReviewModal({reviews}) {
    const [show, setShow] = useState(false)
  return (
        <div>
                <button className='relative bg-black rounded-md p-2 text-white mt-3' onClick={()=>setShow(true)}>
                    Show All Reviews
                </button>
        <div className={`${show ? "flex" :"hidden"} fixed w-full min-h-screen z-20 justify-center  bg-white top-0 right-0 p-10`}>
            <div className="w-full lg:w-2/3 h-screen overflow-y-scroll">
                 <div className="flex justify-between items-center">
                    <div className='font-bold text-xl mb-5'>Reviews</div>
                    <IoCloseCircle className='w-8 h-8' onClick={()=>setShow(false)}/>
                 </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 space-x-5 space-y-10 pb-10">
                    {
                        reviews?.map((review)=>(
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
            </div>
        </div>
             

        </div>
   

  )
}

export default ReviewModal