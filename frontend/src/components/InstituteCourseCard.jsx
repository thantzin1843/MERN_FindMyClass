import React from 'react'

function InstituteCourseCard({course}) {
  return (
                    <div className='relative min-w-[100%] sm:min-w-[35%] lg:min-w-[25%] border border-gray-300'>
                        <div className="w-full h-[200px]">
                            <img src={course?.images?.[0]} className='w-full h-full object-cover' alt="" />
                        </div>

                       <div className="p-3 space-y-1">
                            <div className='line-clamp-2 font-semibold'>
                                {course?.name}
                            </div>
                            <div className='font-bold'>
                                {course?.current_fee} Ks
                            </div>
                            <button className='bg-black text-white py-1 px-5 rounded-md'>Edit</button><br />
                            <label class="inline-flex items-center cursor-pointer mt-3">
                            <input type="checkbox" value="" class="sr-only peer"/>
                            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                            <span class="ms-3 text-sm font-medium ">Publish Course</span>
                            </label>
                            

                       </div>

                       <div className="absolute flex top-0 left-0 justify-between w-full items-center">
                       <div className='bg-orange-500 px-2'>{new Date(course?.start_date).toLocaleDateString()}</div>
                       </div>
                    </div>
  )
}

export default InstituteCourseCard