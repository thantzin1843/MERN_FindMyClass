import React, { useState } from 'react'
import { FcNext, FcPrevious } from 'react-icons/fc'
import { IoCloseCircle } from 'react-icons/io5'
import { MdPhoto } from 'react-icons/md'

const images = [
    {
        img:"https://www.myanmaritv.com/sites/default/files/styles/news_detail_image/public/051122%20Industrial%20training%20schools%20%20%285%29.jpg?itok=8oR0-Bql",
        text:"One paraggrapeeo "
    },
    {
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrr1j-eS99KSCepNQRaiZkBcGVnfqgj3qseB9gCgq5UA6BBVzEgM-tx_Xfu4BChqAyNBs&usqp=CAU",
        text:"TWo paraggrapeeo "
    },
    {
        img:"https://educationandtrainingacademy.co.uk/wp-content/uploads/2022/02/Education-and-Training-Academy.jpg",
        text:"three paraggrapeeo "
    },
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRzBcReMEv8qfBprHrgLGlrst1P_bGQPG1UA&s",
        text:"four paraggrapeeo "
    },
    
    
   
    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKel0pE7hVT5oLHvvO86aQgEd3rjJUfjqrAQ&s"
]
function InstructorModal() {
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
                        [1,2,3,4,4,4,4,4,4,4,].map(()=>(
                            <div className='space-y-3'>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTComBxCbdkdSpHqAnQngEPdOckocvxj3fDPQ&s" className='w-[100px] h-[100px] border rounded-full' alt="" />
                                <div>
                                    <div className='text-xl'>Thant Zin Win</div>
                                    <div className='text-sm textgry'>thant@gmail.com</div>
                                    <div className='text-sm textgry'>09456738383</div>
                                    <div className='font-bold text-red-500 text-sm'>Chief Information Officer</div>
                                    <div className=' text-sm'>B.C.Sc (Software Engineering) <br /> 
                                    M.C.Sc(Knowledge Enginnering) </div>
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