import React, { useEffect, useState } from 'react'
import ImageModal from '../components/ImageModal';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { FaDiamond } from 'react-icons/fa6';
import { BiCalendar, BiCategory, BiCheckCircle } from 'react-icons/bi';
import { GiTeacher } from 'react-icons/gi';
import QrUpload from '../components/ImageKit/QrUpload';

function EnrollPage() {
    const {id} = useParams();
    const [phone, setPhone] = useState("")
    const [selectedPayment, setSelectedPayment] = useState("")
    const [paymentImage, setPaymentImage] = useState("")
    const [gender, setGender] = useState("")
    const uploadPaymentImage = (img) =>{
        setPaymentImage(img)
    }

    const [course, setCourse] = useState([])
    const [paymentMethods , setPaymentMethods] = useState([]);
    const [qr, setQr] = useState("")
    const [receiver, setReceiver] = useState("")
    const changeQr = (paymentName) =>{
        setSelectedPayment(paymentName)
        const method = paymentMethods.find(method => method.name === paymentName);
        setQr(method?.qr);
        setReceiver(method?.receiver)
    }
    const fetchCourse = async() =>{
           try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/course/${id}`);
                const data = await res.json();  
                setCourse(data);
                setPaymentMethods(data?.institute_id?.payments)
            } catch (error) {
               toast.error(error.message)
            }
       }
    
        useEffect(()=>{
            fetchCourse()
        },[])

        function convertTo12Hour(time24) {
            const [hourStr, minute] = time24.split(':');
            let hour = parseInt(hourStr, 10);
            const ampm = hour >= 12 ? ' PM' : ' AM';
            hour = hour % 12 || 12; // convert 0 to 12 for 12 AM
            return `${hour}:${minute}${ampm}`;
        }

        const handleEnroll = async(e)=>{
            e.preventDefault()
            const payload = {
                name:JSON.parse(localStorage.getItem('userInfo'))?.name,
                email:JSON.parse(localStorage.getItem('userInfo'))?.email,
                user_id:JSON.parse(localStorage.getItem('userInfo'))?.id,
                course_id:course?._id,
                phone:phone,
                gender:gender,
            }

            if(selectedPayment && paymentImage ){
                payload.selected_payment = selectedPayment;
                payload.payment_status = true;
                payload.payment_image = paymentImage;
            }

            console.log(payload)
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/course/enroll`,{
                    method:'post',
                    headers:{
                        'Content-Type':'application/json',
                        'authorization':`Bearer ${localStorage.getItem('token')}`
                    },
                    body:JSON.stringify(payload)
                })
                const data = await res.json();
                console.log(data)
                if(res.status == 201){
                    toast.success(data?.message)
                }else{
                    toast.success(data?.message)
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        
  return (
    <div className='px-10 md:px-20'>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="col-span-1 lg:col-span-1 bg-gray-100 rounded-md p-4">
            <div className='text-xl mb-5'>Course Info</div>
            <div className="flex items-center gap-2 flex-wrap">
                <img src={course?.institute_id?.logo} className='w-15 shadow-lg border border-gray-200 rounded-full h-15 ' alt="" />
                <div className='text-xl'>{course?.institute_id?.name}</div>
            </div>

            <div className='text-3xl mt-5'>
                {course?.name}
            </div>
            <div className="flex items-center mt-5 gap-5 flex-wrap">
                <div className='text-xl'><GiTeacher className='inline' size={30}/> {course?.instructor?.name}</div>
                <div className='bg-black text-white p-1 px-5 rounded-full flex items-center gap-3'> <div className='w-1 h-1 rounded-full bg-green-500'></div>{course?.type}</div>
                {
                    course?.certificate && (
                        <div className='flex items-center gap-1'>
                            <BiCheckCircle className='text-green-600' size={30}/> Certificate
                        </div>
                    )
                }
                 <div className='p-1 px-5 flex items-center gap-2'>
                      <BiCategory size={25}/> {course?.category}
                </div>
            </div>

            <div className='flex gap-3 items-center my-5'>
                <div className='text-xl'>{course?.current_fee} MMK</div>
                <div className='text-sm line-through text-red-500'>{course?.original_fee} MMK</div>
            </div>

            <div className='my-3'>
                Course duration is <span className='text-xl'>{course?.duration}  months.</span>
                Student limit is <span className='text-xl'> {course?.student_limit}</span>.
            </div>

            <div className='my-5'>
                <BiCalendar size={30} className='inline'/>Start Date: <span className=' text-xl'>
                    {course?.start_date && new Date(course?.start_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).replace(',', '').split(' ').join('-')}
                </span>
            </div>

            <div>Time table</div>
            <table>
                {
                    course?.schedules?.map((schedule , index)=>(
                    <tr className='border' key={index}>
                        <td className='px-5'>{schedule.day}</td>
                        <td className='text-xl px-5'>{convertTo12Hour(schedule.time)}</td>
                    </tr>
                    ))
                }
               
               
            </table>

            <p className='my-5'>
               {course?.about}
            </p>

            <div>
                <div className='text-xl'>Course Contents</div>
                <div className="space-y-3 mt-3">
                    {
                    course?.contents?.map((c,index)=>(
                        <div key={index} className='flex items-center gap-2'>
                           <FaDiamond/> {c}
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>


        <div class="col-span-1 lg:col-span-2 bg-gray-100 p-4 rounded-md ">
            <form onSubmit={handleEnroll} className="w-full">
                <div className='text-lg mb-5'>Please Fill the following informations to enroll course</div>
                <div className='mb-3'>
                    <label htmlFor="" className='text-sm'>Student Name</label>
                    <input type="text" disabled value={JSON.parse(localStorage.getItem('userInfo'))?.name} name="" className='p-2 border border-gray-400 rounded-md w-full ' id="" />
                </div>

                <div className='mb-3'>
                    <label htmlFor="" className='text-sm'>Student Email</label>
                    <input type="email" value={JSON.parse(localStorage.getItem('userInfo'))?.email} name="" disabled className='p-2 border border-gray-400 rounded-md w-full ' id="" />
                </div>

                <div className='mb-3'>
                    <label htmlFor="" className='text-sm'>Phone</label>
                    <input type="text" name="" onChange={(e)=>setPhone(e.target.value)} className='p-2 border border-gray-400 rounded-md w-full ' id="" />
                </div>

                <div className='mb-3'>
                     <label className='text-gray-500 text-sm'>Gender</label>
                    <select className="border border-gray-400 p-2 rounded-md w-full" onChange={(e)=>setGender(e.target.value)} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    </select>
                </div>

                <div className="flex gap-3">
                    <img src={qr} className='w-40 h-40 rounded-md mb-3' alt={qr} />
                    <div>{receiver}</div>
                </div>
                <div className='flex justify-start gap-3 '>
                    {
                        paymentMethods?.map((p,index)=>(
                            <div key={index} onClick={()=>changeQr(p.name)} className={`w-20 h-20 flex justify-center items-center border border-gray-500 rounded-md 
                            ${p.qr == qr && "border-2 border-green-500" }`}>
                                {p.name} 
                            </div>
                        ))
                    }
                    
                </div>
                <div className='mt-5'>
                    <div>Upload payment image:</div>
                    <img src={paymentImage} className='w-30 h-30 rounded-md my-3 ' alt="" />
                    <QrUpload setPaymentQr={uploadPaymentImage}/>
                </div>


                <button type="submit" className='w-full bg-black text-white py-2 rounded-md mt-5'>Enroll</button>
            </form>
        </div>
</div>
    </div>
  )
}

export default EnrollPage