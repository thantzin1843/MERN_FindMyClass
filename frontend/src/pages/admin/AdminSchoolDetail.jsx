import React, { useEffect, useState } from 'react'
import { BiPhone } from 'react-icons/bi'
import { CiLocationOn } from 'react-icons/ci'
import { MdEmail, MdPhoto } from 'react-icons/md'
import { BsStar } from 'react-icons/bs'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'
import ImageModal from '../../components/ImageModal'
import InstructorModal from '../../components/InstructorModal'


function AdminSchoolDetail() {
    const {id} = useParams();
    const [institute, setInstitute] = useState([])
    const [staffs, setStaffs] = useState([])
    const [courses, setCourses] = useState([])
    const fetchInstitute = async() =>{
           try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/institute/user/${id}`);
                const data = await res.json();
                console.log(data);
                setInstitute(data?.institute);
                setCourses(data?.courses);
                setStaffs(data?.members)
            } catch (error) {
               toast.error(error.message)
            }
       }
    
       useEffect(()=>{
          fetchInstitute()
       },[])
  return (
    <div className='px-5 lg:px-40 '>
        <div className="w-full lg:w-2/3 mt-10 mx-auto">
            <img src={institute?.logo} className='w-20 border rounded-full h-20 ' alt="" />
            <div className="flex items-center mb-2 mt-5 gap-5">
                <div className='text-3xl '>{institute?.name}</div>
                <div className="p-1 px-5 bg-orange-500 text-white rounded-md">
                    {institute?.category}
                </div>
            </div>


           <div className="flex gap-5 mb-2 flex-wrap">
                <div className='flex items-center gap-2'>
                    <BiPhone size={25}/>
                    {
                        institute?.phone?.map((p,index)=>(
                            <span className='' key={index}>{p}, </span>
                        ))
                    }
                </div>
                <div className='flex items-center gap-2'>
                    <MdEmail size={25}/><span>{institute?.email}</span>
                </div>
           </div>

           <div className='flex items-center mb-5'>
            <CiLocationOn size={25}/>{institute?.address}
           </div>

           <ImageModal images={institute?.images}/>

           

            <p className='mt-5'>
                {institute?.about}
            </p>
          
          <div className='mt-5 mb-10 '>
            <div className='font-bold text-xl mb-5'>Members</div>
            <div className="grid grid-cols-2 lg:grid-cols-3 space-x-5 space-y-10">
               {
                staffs?.map((staff,index)=>(
                     <div className='space-y-3' key={index}>
                        <img src={staff?.profile} className='w-[100px] h-[100px] border rounded-full' alt="" />
                        <div>
                            <div className='text-xl'>{staff?.name}</div>
                            <div className='text-sm textgry'>{staff?.email}</div>
                            <div className='text-sm textgry'>{staff?.phone?.map((p)=><span>{p}, </span>)}</div>
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
            <InstructorModal staffs={staffs}/>

          </div>

        </div>

    </div>
  )
}

export default AdminSchoolDetail