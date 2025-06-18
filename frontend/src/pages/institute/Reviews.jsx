import React from 'react'
import { BsStar } from 'react-icons/bs'

function Reviews() {
  return (
        <div className='px-10 lg:px-45 '>
        <div className="w-full lg:w-3/4 mx-auto">
            <div className='mt-5 mb-10 '>
            <div className='font-bold text-xl mb-5'>Reviews</div>
            <div className="grid grid-cols-1 lg:grid-cols-3 space-x-10 space-y-10">
               {
                [1,2,4,4,4,4,4,4,4,4,3].map(()=>(
                     <div className='space-y-3'>
                        <div className="flex items-center gap-3">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTComBxCbdkdSpHqAnQngEPdOckocvxj3fDPQ&s" className='w-[50px] h-[50px] border rounded-full' alt="" />
                            <div className='text-xl'>
                                <div>Thant Zin Win</div>
                                <div className='space-x-1'>{
                                    [1,2,3,4,5].map(()=><BsStar className='inline '/>)
                                    } 
                                </div>
                            </div>
                        </div>
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur voluptas officiis ducimus, odio deserunt, facilis vero excepturi nobis officia neque commodi distinctio veritatis cupiditate sed provident veniam incidunt voluptatibus ab.
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