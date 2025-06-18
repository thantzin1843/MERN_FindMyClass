import React from 'react'

function MultistepIndicator({index}) {
  return (
    <div className='flex mb-15 items-center space-x-3 w-full '>
        <div className={`${index==1 && "bg-black text-white"} border rounded-full w-8 h-8 flex items-center justify-center `}>1</div>
        <div className="h-1 bg-black w-1/4"></div>
        <div className={`${index==2 && "bg-black text-white"} border rounded-full w-8 h-8 flex items-center justify-center `}>2</div>
        {/* <div className="h-1 bg-black w-20"></div>
        <div className='border rounded-full w-8 h-8 flex items-center justify-center '>3</div>
        <div className="h-1 bg-black w-20"></div> */}
    </div>
  )
}

export default MultistepIndicator