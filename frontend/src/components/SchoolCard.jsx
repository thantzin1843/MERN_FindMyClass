import React from 'react'
import { BiPhone } from 'react-icons/bi'
import { CiLocationOn } from 'react-icons/ci'
import { Link } from 'react-router-dom'

function SchoolCard({institute}) {
  return (
                        <div className='relative min-w-[100%] sm:min-w-[35%] lg:min-w-[25%] border border-gray-300'>
                        <div className="w-full h-[200px]">
                            <img src={institute?.images?.[0] || institute?.logo} className='w-full h-full object-cover' alt="" />
                        </div>

                       <div className="p-3 space-y-1">
                            <div className='line-clamp-2 font-semibold text-xl mb-3'>
                                {institute?.name}
                            </div>

                           <div className="flex gap-3 text-sm flex-wrap">
                             <div className='flex items-center'>
                               <CiLocationOn className='inline w-4 h-4'/>{institute?.address}
                            </div>
                             <div className='flex items-center flex-wrap'>
                               <BiPhone className='inline w-4 h-4'/> {
                                institute?.phone?.map((p,index)=>(
                                    <span key={index}>{p},&nbsp; </span>
                                ))
                               }
                            </div>
                           </div>

                           <div className="text-sm text-gray-800 line-clamp-3">
                            {institute?.about}
                           </div>
                           
                            <div className='mt-5'>
                              <Link to={`/schools/${institute?._id}`} className='bg-black text-white py-2  px-5 rounded-md cursor-pointer'>Explore !</Link>
                            </div>
                       </div>

                       <div className="absolute flex top-0 left-0 justify-between w-full items-center">
                        <img src={institute?.logo} className='w-12 h-12' alt="" />
                       </div>
                    </div>
  )
}

export default SchoolCard