import React, { useEffect, useState } from 'react'
import CourseCard from '../../components/CourseCard'
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import { BiFemale, BiFemaleSign, BiMale, BiMaleSign } from 'react-icons/bi'

function Members() {
   const [members, setMembers] = useState([])
   const instituteInfo = JSON.parse(localStorage.getItem('instituteInfo'))
   const fetchMembers = async(id) =>{
       try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/institute/${id}/staffs`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await res.json();
            console.log(data);
            setMembers(data);
        } catch (error) {
            console.log(error.message)
        }
   }

   useEffect(()=>{
      fetchMembers(instituteInfo?._id)
   },[])

   const handleDeleteMember = async(id) =>{
         try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/institute/staffs/${id}`, {
                method: 'delete',
                headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await res.json();
            console.log(data);
            fetchMembers(instituteInfo?._id);
         } catch (error) {
            console.log(error.message)
         }
   }
  return (
     <div className='px-5 lg:px-45 '>
        <div className="w-full lg:w-3/4 mx-auto">
           <div className='mt-20 lg:mt-10 mb-10 '>
            <div className="flex items-center justify-between gap-5 mb-10">
                  <div className='font-bold text-xl mb-5'>Members</div>
                  <div>
                     <Link to={'/institute/members/createPage'} className='bg-black py-2 px-5 rounded-lg text-white'>Add Members </Link>
                  </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 space-x-5 space-y-10">
               {
                members?.map((member, index)=>(
                     <div key={index} className='space-y-3 relative group'>
                        <img src={member?.profile} className='w-[100px] h-[100px] border rounded-full' alt="" />
                        <div>
                            <div className='text-xl flex items-center'>{member?.name} 
                              {
                                 member?.gender == "male" ? <BiMaleSign className="inline ms-3" size={20}/> : <BiFemaleSign className="inline ms-3" size={20}/> 
                              }
                            </div>
                            <div className='text-sm textgry'>{member?.email}</div>
                            <div className='text-sm textgry'>
                              {
                                 member?.phone?.map((p,index)=>(
                                    <div>{p} </div>
                                 ))
                              }
                            </div>
                            <div className='font-bold text-red-500 text-sm'>{member?.position}</div>
                            <div className=' text-sm'>
                              {
                                 member?.education?.map((education, index)=>(
                                    <div key={index}>
                                       {education}
                                    </div>
                                 ))
                              }
                            </div>
                        </div>
                        {
                           member?.position !== "Founder" && (
                              <button onClick={()=>handleDeleteMember(member?._id)} className='opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 shadow-lg p-2 bg-red-100 text-red-800 rounded-md absolute top-0 left-0 cursor-pointer'>
                                 <MdDelete size={20}/>
                              </button>
                           )
                        }
                    </div>
                ))
               }

            </div>

          </div>
        </div>

    </div>
  )
}

export default Members