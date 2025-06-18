import React, { useEffect, useState } from 'react'
import { BiPhone } from 'react-icons/bi'
import { CiLocationOn } from 'react-icons/ci'
import { MdEmail, MdPhoto } from 'react-icons/md'
import ImageModal from '../../components/ImageModal'
import { Link } from 'react-router-dom'

const contacts = [
  { name: "Facebook", link: "https://www.facebook.com" },
  { name: "Instagram", link: "https://www.instagram.com" },
  { name: "WhatsApp", link: "https://www.whatsapp.com" },
  { name: "Telegram", link: "https://web.telegram.org" },
  { name: "Viber", link: "https://www.viber.com" },
//   { name: "Messenger", link: "https://www.messenger.com" },
//   { name: "Snapchat", link: "https://www.snapchat.com" },
//   { name: "Twitter (X)", link: "https://www.twitter.com" },
//   { name: "LinkedIn", link: "https://www.linkedin.com" },
//   { name: "Signal", link: "https://signal.org" }
];

function Profile() {
    const [profile, setProfile] = useState({})
    const instituteInfo = JSON.parse(localStorage.getItem('instituteInfo'))
    const token = localStorage.getItem('token');
    const fetchInstituteProfile = async(id) =>{
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/institute/${id}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            console.log(data);
            setProfile(data);
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(()=>{
        fetchInstituteProfile(instituteInfo?._id)
    },[])

  return (
    <div className='px-5 lg:px-45 '>
        <div className="w-full lg:w-3/4 mx-auto mb-5">
           <div className="flex mt-20 lg:mt-10 justify-between">
             <img src={profile?.logo} className='w-20 border rounded-full h-20 ' alt="" />
             <div>
                <Link to={'/institute/profile/editPage'} className='bg-black py-2 px-5 rounded-lg text-white'>Edit </Link>
             </div>
           </div>
            
            <div className="flex items-center mb-2 mt-5 gap-5">
                <div className='text-3xl '>{profile?.name} </div>   
            </div>
            <div className="flex gap-3 my-5 flex-wrap">
                <div className="p-1 px-5 bg-orange-500 text-white rounded-md">
                Category: {profile?.category}
                </div>
                <div className="p-1 px-5 bg-orange-500 text-white rounded-md">
                    Type: {profile?.type?.toUpperCase()}
                </div>
            </div>


           <div className="flex gap-5 mb-2 flex-wrap">
                <div className='flex items-center gap-2'>
                    <BiPhone size={25}/>
                    {
                        profile?.phone?.map((p,index)=>(
                            <span key={index} className=''>{p},</span>
                        ))
                    }
                </div>
                <div className='flex items-center gap-2'>
                    <MdEmail size={25}/><span>{profile?.email}</span>
                </div>
           </div>

           <div className='flex items-center mb-5'>
            <CiLocationOn size={25}/>{profile?.address}
           </div>

           <ImageModal images={profile?.images}/>

           

            <p className='mt-5'>
                {profile?.about}
            </p>
          
          <div className=' rounded-lg overflow-hidden my-10'>
            <div className="text-xl">Contact</div>
            <table className='w-full '>
                {
                    contacts?.map((c,index)=>(
                        <tr className='' key={index}>
                            <td className='py-2'>{c.name}</td>
                            <td className='py-2 underline'>
                                <Link to={c.link}>{c.link}</Link>
                            </td>
                        </tr>
                    ))
                }
               
            </table>
          </div>
          

        </div>

    </div>
  )
}

export default Profile