import React from 'react'
import { BiPhone } from 'react-icons/bi'
import { CiLocationOn } from 'react-icons/ci'

function SchoolCard() {
  return (
                        <div className='relative min-w-[100%] sm:min-w-[35%] lg:min-w-[25%] border border-gray-300'>
                        <div className="w-full h-[200px]">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTComBxCbdkdSpHqAnQngEPdOckocvxj3fDPQ&s" className='w-full h-full object-cover' alt="" />
                        </div>

                       <div className="p-3 space-y-1">
                            <div className='line-clamp-2 font-semibold text-xl mb-3'>
                                IGM Japanese Training School
                            </div>

                           <div className="flex gap-3 text-sm">
                             <div className='flex items-center'>
                               <CiLocationOn className='inline w-4 h-4'/> Yangon
                            </div>
                             <div className='flex items-center'>
                               <BiPhone className='inline w-4 h-4'/> 09-445068826
                            </div>
                           </div>

                           <div className="text-sm text-gray-800 line-clamp-3">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non ipsa vel, quas in maiores atque aspernatur, reiciendis omnis veritatis quisquam eligendi nesciunt error exercitationem repudiandae a quaerat assumenda commodi animi?
                           </div>
                           
                            <button className='bg-black text-white py-1 mt-3 px-5 rounded-md cursor-pointer'>Explore !</button>
                       </div>

                       {/* <div className="absolute flex top-0 left-0 justify-between w-full items-center">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTComBxCbdkdSpHqAnQngEPdOckocvxj3fDPQ&s" className='w-12 h-12' alt="" />
                       </div> */}
                    </div>
  )
}

export default SchoolCard