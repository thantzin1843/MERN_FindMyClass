import React, { useEffect, useState } from 'react'
import CourseCard from '../../components/CourseCard'
import InstituteCourseCard from '../../components/InstituteCourseCard'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

function Courses() {
 const [institutes, setInstitutes] = useState([])
       const fetchInstitutes = async() =>{
           try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/institute`);
                const data = await res.json();
                console.log(data);
                setInstitutes(data);
            } catch (error) {
               toast.error(error.message)
            }
       }
    
       useEffect(()=>{
          fetchInstitutes()
       },[])

       const changeInstituteStatus = async(status,id) =>{
        try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/institute/changeStatus`,{
                  method:'put',
                  headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${localStorage.getItem('token')}`
                  },
                  body:JSON.stringify({status:status,id:id})
                });
                const data = await res.json();
                console.log(data)
        } catch (error) {
          toast.error(error.message)
        }
       }
  return (
     <div className='px-5 lg:px-45 '>
        <div className="w-full lg:w-3/4 mx-auto">
          <div className='mt-20 lg:mt-10 '>
           <div className="flex justify-between mb-10">
             <div className='font-bold text-xl mb-5'>Courses</div>
                  
           </div>
            {/* <div className="grid grid-cols-1 lg:grid-cols-3 space-x-5 space-y-10">
               {
                courses?.map((course,index)=>(
                    <InstituteCourseCard key={index} course={course}/>
                ))
               }

            </div> */}
           <div className='rounded-md overflow-scroll lg:overflow-hidden '>
             <table className='w-full '>
               <thead>
                  <tr className='border-b bg-gray-200'>
                     <td className='p-2'>Logo</td>
                     <td className='p-2'>Name</td>
                     <td className='p-2'>Email</td>
                     <td className='p-2'>Type</td>
                     <td className='p-2'>Phone</td>
                     <td className='p-2'>Status</td>
                  </tr>
               </thead>
               <tbody>
                {
                  institutes?.map((institute,index)=>(
                    <tr className='' key={index}>
                     <td className='p-2'>
                      <Link to={`/admin/schools/${institute?._id}`}><img src={institute?.logo} className='w-15 h-15 rounded-full' alt="" /></Link>
                     </td>
                     <td className='p-2 text-sm'>{institute?.name}</td>
                     <td className='p-2 text-sm'>{institute?.email}</td>
                     <td className='p-2 text-sm'>{institute?.type}</td>
                     <td className='p-2 text-sm'>{institute?.phone?.map((p)=><div>{p}</div>)}</td>
                     <td className='p-2 text-sm'>
                      <select name="" id="" onChange={(e)=>changeInstituteStatus(e.target.value,institute?._id)}>
                        <option value="active" selected={institute?.status == "active"}>Active</option>
                        <option value="inactive" selected={institute?.status == "inactive"}>Inactive</option>
                        <option value="pending" selected={institute?.status == "pending"}>Pending</option>
                      </select>
                     </td>
                   </tr>
                  ))
                }
               </tbody>
            </table>
           </div>
            

          </div>
        </div>

    </div>
  )
}

export default Courses