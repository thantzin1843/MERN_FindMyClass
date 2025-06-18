
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ProfileImageUpload from '../../components/ImageKit/ProfileImageUpload';
import { useNavigate } from 'react-router-dom';
import LogoUpload from '../../components/ImageKit/LogoUpload';
import MultipleImageUpload from '../../components/ImageKit/MultipleImageUpload';


function EditProfilePage() {
  const instituteInfo = JSON.parse(localStorage.getItem('instituteInfo'))
  const token = localStorage.getItem('token');
  const [images, setImages] = useState([])
  const [formData, setFormData] = useState({});
   const [profile,setProfile] = useState("")
  const changeProfile = (img) =>{
    setProfile(img)
  }

  const handleImages =(img)=>{
    setImages((prev)=>{
      if (!prev.includes(img)) {
        return [...prev, img];
      }
      return prev;
    })
  }

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
              // console.log(data);
              setFormData(data);
              setProfile(data?.logo)
              setImages(data?.images)
          } catch (error) {
              console.log(error.message)
          }
      }
    useEffect(()=>{
        fetchInstituteProfile(instituteInfo?._id)
    },[])

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (name === "phone" && index !== null) {
      const newPhones = [...formData.phone];
      newPhones[index] = value;
      setFormData({ ...formData, phone: newPhones });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addPhoneField = () => {
    setFormData({ ...formData, phone: [...formData.phone, ""] });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const cleanedPhones = formData.phone.filter(p => p.trim() !== "");
    const {
      name,
      email,
      category,
      type,
      address,
      about
    } = formData;

    // Validation
    if (!name.trim()) return toast.error("Institute name is required.");
    if (!email.trim()) return toast.error("Email is required.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Invalid email format.");
    if (cleanedPhones.length === 0) return toast.error("At least one valid phone number is required.");
    if (!category) return toast.error("Institute category is required.");
    if (!type) return toast.error("Institute type is required.");
    if (!address.trim()) return toast.error("Address is required.");
    if (!about.trim()) return toast.error("About section is required.");

    const payload = {
          id:instituteInfo?._id,
          name,
          email,
          phone: cleanedPhones,
          category,
          type,
          address,
          about,
          logo:profile,
          images
    }
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/institute/updateProfile`,{
          method:'put',
          headers:{
            'Content-Type':'application/json',
            'authorization':`Bearer ${localStorage.getItem('token')}`
          },
          body:JSON.stringify(payload)
        })
        const data = await res.json();
        console.log(data)
        return data;
      } catch (error) {
        console.log(error.message)
      }
  };

  return (
    <div className='px-5 lg:px-45'>
      <div className="w-full lg:w-3/4 mx-auto mb-5 mt-5">
          <LogoUpload changeProfile={changeProfile} logo={profile}/> 
          <div className='my-5'>
            <label className='text-gray-500 text-sm'>Institute Name</label>
            <input type="text" name="name" placeholder='Institute Name'
              className="border border-gray-400 p-2 rounded-md w-full"
              value={formData.name}
              onChange={handleChange}
              required />
          </div>

          <div className='my-5'>
            <label className='text-gray-500 text-sm'>Institute Email</label>
            <input type="email" name="email" placeholder='Email' disabled
              className="border border-gray-400 p-2 rounded-md w-full"
              value={formData.email}
              onChange={handleChange}
              required />
          </div>

          <div className='my-5'>
            <label className='text-gray-500 text-sm'>Phone</label>
            {formData?.phone?.map((phone, index) => (
              <div className="flex gap-2 my-1" key={index}>
                <input
                  type="text"
                  name="phone"
                  placeholder='09123456789'
                  className="border border-gray-400 p-2 rounded-md w-full"
                  value={phone}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            ))}
            <button type="button" className='p-1 px-5 bg-black text-white rounded-md mt-1' onClick={addPhoneField}>+</button>
          </div>

          <div className='my-5'>
            <label className='text-gray-500 text-sm'>Institute Category</label>
            <select
              name="category"
              className="border border-gray-400 p-2 rounded-md w-full"
              value={formData.category}
              onChange={handleChange}
              required>
              <option value="">-- Select Category --</option>
              <option value="Technology">Technology</option>
              <option value="Japanese Language">Japanese Language</option>
            </select>
          </div>

          <div className='my-5'>
            <label className='text-gray-500 text-sm'>Institute Type</label>
            <select
              name="type"
              className="border border-gray-400 p-2 rounded-md w-full"
              value={formData.type}
              onChange={handleChange}
              required>
              <option value="">-- Select Type --</option>
              {
                ["school", "college", "university", "training center","institute", "other"].map((type,index)=>(
                  <option value={type} key={index}>{type.toUpperCase()}</option>
                ))
              }
            </select>
          </div>

          <div className='my-5'>
            <label className='text-gray-500 text-sm'>Address</label>
            <textarea
              name="address"
              className="border border-gray-400 p-2 rounded-md w-full"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-3 my-3">
              {
              images?.map((img,index)=>(
                  <img key={index} src={img} className='w-20 border h-20 rounded-md border-gray-500' alt="" />
              ))
              }
          </div>
          <MultipleImageUpload handleImages={handleImages} images={images}/>

          <div className='my-5'>
            <label className='text-gray-500 text-sm'>About Institute</label>
            <textarea
              name="about"
              rows={10}
              className="border border-gray-400 p-2 rounded-md w-full"
              value={formData.about}
              onChange={handleChange}
            />
          </div>



          <button type="button" onClick={handleSubmit} className='bg-black text-white  p-2 w-full rounded-md'>Next</button>
      </div>
    </div>
  );
}

export default EditProfilePage;
