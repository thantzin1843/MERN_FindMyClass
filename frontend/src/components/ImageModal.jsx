import React, { useState } from 'react'
import { FcNext, FcPrevious } from 'react-icons/fc'
import { IoCloseCircle } from 'react-icons/io5'
import { MdPhoto } from 'react-icons/md'

function ImageModal({images}) {
    const [index, setIndex] = useState(0)
    const [show, setShow] = useState(false)
  return (
        images?.length > 0 ? (
                <div>
                <div className='relative' onClick={()=>setShow(true)}>
                <img src={images[0]} className='w-full object-cover ' alt="" />
                <div className='absolute left-5 top-5 flex items-center text-xl bg-[#000000aa] text-white p-3 rounded-lg'>
                    <MdPhoto size={40}/> {images.length}
                </div>
                </div>

                <div className={`${show ? 'flex' : 'hidden'} w-full h-screen bg-[#ffffff] top-0 z-20 left-0 fixed p-2 md:p-5  items-center justify-center gap-2 md:gap-5`}>
                    <IoCloseCircle className='w-10 h-10 absolute top-5 right-5' onClick={()=>setShow(false)}/>
                    <button className='bg-black text-white p-3 rounded-full ' onClick={()=> index == 0 ?  setIndex(images.length-1):setIndex(index-1) } >
                        <FcPrevious/>
                    </button>

                    <div>
                        <img className='w-full object-cover h-[400px] md:w-[800px] rounded-lg ' src={images[index]} alt="" />
                        {/* <div className='text-center font-semibold text-xl'>{images[index].text}</div> */}
                    </div>

                    <button className='bg-black text-white p-3 rounded-full ' onClick={()=> index < images.length-1 ? setIndex(index+1) : setIndex(0)}>
                        <FcNext/>
                    </button>
                </div>
            </div>
        ):(
            <div>No photo to show.</div>
        )
  )
}

export default ImageModal