
import React, { useState } from 'react';
import { BiCamera } from 'react-icons/bi';
import MultistepIndicator from '../../components/MultistepIndicator';
import { toast } from 'sonner';
import ProfileImageUpload from '../../components/ImageKit/ProfileImageUpload';
import { useInstituteSignUpContext } from '../../context/InstituteSignUpContext';
import { useNavigate } from 'react-router-dom';


function InstituteSignup() {
  const navigate = useNavigate()
  const {updateData} = useInstituteSignUpContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: [""],
    category: "",
    type: "",
    address: "",
    about: ""
  });
  const [profile,setProfile] = useState("")
  const changeProfile = (img) =>{
    setProfile(img)
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedPhones = formData.phone.filter(p => p.trim() !== "");
    const {
      name,
      email,
      password,
      confirmPassword,
      category,
      type,
      address,
      about
    } = formData;

    // Validation
    if (!name.trim()) return toast.error("Institute name is required.");
    if (!email.trim()) return toast.error("Email is required.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Invalid email format.");
    if (password.length < 6) return toast.error("Password must be at least 6 characters.");
    if (password !== confirmPassword) return toast.error("Passwords do not match.");
    if (cleanedPhones.length === 0) return toast.error("At least one valid phone number is required.");
    if (!category) return toast.error("Institute category is required.");
    if (!type) return toast.error("Institute type is required.");
    if (!address.trim()) return toast.error("Address is required.");
    if (!about.trim()) return toast.error("About section is required.");

    updateData({
       institute:{
         name,
          email,
          password,
          phone: cleanedPhones,
          category,
          type,
          address,
          about,
          logo:profile
       }
    })
    toast.success("Form is valid. Ready to proceed!");
    navigate('/institute/signup2')
    console.log("helo")
  };

  return (
    <div className='px-5 lg:px-45'>
      <div className="w-full lg:w-3/4 mx-auto mb-5 mt-5">
        <MultistepIndicator index={1} />
          <ProfileImageUpload changeProfile={changeProfile}/> 
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
            <input type="email" name="email" placeholder='Email'
              className="border border-gray-400 p-2 rounded-md w-full"
              value={formData.email}
              onChange={handleChange}
              required />
          </div>

          <div className='my-5'>
            <label className='text-gray-500 text-sm'>Password</label>
            <input type="password" name="password" placeholder='Password'
              className="border border-gray-400 p-2 rounded-md w-full"
              value={formData.password}
              onChange={handleChange}
              required />
          </div>

          <div className='my-5'>
            <label className='text-gray-500 text-sm'>Confirm Password</label>
            <input type="password" name="confirmPassword" placeholder='Confirm Password'
              className="border border-gray-400 p-2 rounded-md w-full"
              value={formData.confirmPassword}
              onChange={handleChange}
              required />
          </div>

          <div className='my-5'>
            <label className='text-gray-500 text-sm'>Phone</label>
            {formData.phone.map((phone, index) => (
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

export default InstituteSignup;
