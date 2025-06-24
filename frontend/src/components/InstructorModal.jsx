import React, { useState } from 'react'
import { FcNext, FcPrevious } from 'react-icons/fc'
import { IoCloseCircle } from 'react-icons/io5'
import { MdPhoto } from 'react-icons/md'

function InstructorModal({staffs}) {
    const [show, setShow] = useState(false)
  return (
        <div>
                <button className='relative bg-black rounded-md p-2 text-white mt-3' onClick={()=>setShow(true)}>
                    See All Instructors
                </button>

        <div className={`${show ? "flex" :"hidden"} fixed z-20 w-full min-h-screen justify-center bg-white top-0 right-0 p-10`}>
            <div className="w-full lg:w-2/3 h-screen overflow-y-scroll">
                 <div className="flex justify-between items-center">
                    <div className='font-bold text-xl mb-5'>Members</div>
                    <IoCloseCircle className='w-8 h-8' onClick={()=>setShow(false)}/>
                 </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 space-x-5 space-y-10 pb-10">
                    {
                        staffs?.map((staff,index)=>(
                            <div className='space-y-3' key={index}>
                                <img src={staff?.profile} className='w-[100px] h-[100px] border rounded-full' alt="" />
                                <div>
                                    <div className='text-xl'>{staff?.name}</div>
                                    <div className='text-sm textgry'>{staff?.email}</div>
                                    <div className='text-sm textgry'>{staff?.phone?.map((p)=><span>{p}</span>)}</div>
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
            </div>
        </div>
             

        </div>
   

  )
}

export default InstructorModal