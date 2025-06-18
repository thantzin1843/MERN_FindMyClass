
import React, { useState } from 'react';
import { BiCamera } from 'react-icons/bi';
import MultistepIndicator from '../../components/MultistepIndicator';
import { useInstituteSignUpContext } from '../../context/InstituteSignUpContext';
import { toast } from 'sonner';
import ProfileImageUpload from '../../components/ImageKit/ProfileImageUpload';
import { useNavigate } from 'react-router-dom';

function CreateMember() {
  const navigate = useNavigate()
  const instituteInfo = JSON.parse(localStorage.getItem("instituteInfo"))
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [education, setEducation] = useState(['']);
  const [phone, setPhone] = useState(['']);
  const [gender, setGender] = useState('');
  const [position,setPosition] = useState("")

  const [profile,setProfile] = useState("")
  const changeProfile = (img) =>{
    setProfile(img)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Clean phone & education inputs
    const cleanedPhones = phone.filter(p => p.trim() !== '');
    const cleanedEducation = education.filter(e => e.trim() !== '');

    // Validations
    if (!name.trim()) return toast.error("Name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Invalid email format");
    if (cleanedPhones.length === 0) return toast.error("At least one phone number is required");
    if (!gender) return toast.error("Gender is required");

    const payload = {
        name,
        email,
        position,
        education: cleanedEducation,
        phone: cleanedPhones,
        gender,
        profile,
        institute_id:instituteInfo._id
    };
    console.log(payload)

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/institute/createStaff`,{
        method:"post",
        headers:{
          'Content-Type':'application/json',
          'authorization':`Bearer ${localStorage.getItem('token')}`
        },
        body:JSON.stringify(payload)
      })
      const data =await res.json()
      
      if(res.status == 201){
        toast.success(data?.message)
        navigate('/institute/members')
      }
      toast.error(data.message)
    } catch (error) {
      console.log(error.message)
    }

    // You can now navigate or show the next step
  };

  // Add input field logic
  const addPhoneField = () => setPhone([...phone, '']);
  const addEducationField = () => setEducation([...education, '']);

  return (
    <div className='px-5 lg:px-45 '>
      <div className="w-full lg:w-3/4 mx-auto mb-5 mt-5">
        <MultistepIndicator index={2} />
        <form onSubmit={handleSubmit}>
          <ProfileImageUpload changeProfile={changeProfile}/>

          <div className='my-5'>
            <label className='text-gray-500 text-sm'>Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder='Name' className="border border-gray-400 p-2 rounded-md w-full" required />
          </div>

          <div className='my-5'>
            <label className='text-gray-500 text-sm'>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' className="border border-gray-400 p-2 rounded-md w-full" required />
          </div>

          <div className='my-5'>
            <label className='text-gray-500 text-sm'>Position</label>
            <input type="text" value={position} onChange={(e)=>setPosition(e.target.value)} placeholder='Position' className="border border-gray-400 p-2 rounded-md w-full" required />
          </div>

          <div className='my-5'>
            <label className='text-gray-500 text-sm'>Education</label>
            {education.map((edu, idx) => (
              <input key={idx} type="text" value={edu} onChange={e => {
                const updated = [...education];
                updated[idx] = e.target.value;
                setEducation(updated);
              }} placeholder='Education' className="border border-gray-400 p-2 rounded-md w-full my-1" />
            ))}
            <button type="button" onClick={addEducationField} className='p-1 px-5 bg-black text-white rounded-md mt-1'>+</button>
          </div>

          <div className='my-5'>
            <label className='text-gray-500 text-sm'>Phone</label>
            {phone.map((p, idx) => (
              <input key={idx} type="text" value={p} onChange={e => {
                const updated = [...phone];
                updated[idx] = e.target.value;
                setPhone(updated);
              }} placeholder='09123456789' className="border border-gray-400 p-2 rounded-md w-full my-1" />
            ))}
            <button type="button" onClick={addPhoneField} className='p-1 px-5 bg-black text-white rounded-md mt-1'>+</button>
          </div>

          <div className='my-5'>
            <label className='text-gray-500 text-sm'>Gender</label>
            <select value={gender} onChange={e => setGender(e.target.value)} className="border border-gray-400 p-2 rounded-md w-full" required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button type="submit" className='bg-black text-white p-2 w-full rounded-md'>Save</button>
        </form>
      </div>
    </div>
  );
}

export default CreateMember;
