
import React, { useEffect, useState } from 'react';
import { BiCamera, BiDiamond } from 'react-icons/bi';
import MultipleImageUpload from '../../components/ImageKit/MultipleImageUpload';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function CreateCoursePage() {
    const instituteInfo = JSON.parse(localStorage.getItem('instituteInfo'))
    const navigate = useNavigate()
     const [members, setMembers] = useState([])
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

        const [images, setImages] = useState([])
        const handleImages =(img)=>{
            setImages((prev)=>{
            if (!prev.includes(img)) {
                return [...prev, img];
            }
            return prev;
            })
        }

    
  const [formData, setFormData] = useState({
    name: '',
    teacher: '',
    category: '',
    limit: '',
    currentFee: '',
    originalFee: '',
    certificate: false,
    duration: '',
    startDate: '',
    classType: '',
    about: '',
    video: '',
    contents: [],
  });

  const [newContent, setNewContent] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({ day: '', time: '' });

  // Change handler for text inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleAddSchedule = () => {
    if (newSchedule.day && newSchedule.time) {
      setSchedules((prev) => [...prev, newSchedule]);
      setNewSchedule({ day: '', time: '' });
    }
  };

  const handleAddContent = () => {
    if (newContent.trim()) {
      setFormData((prev) => ({
        ...prev,
        contents: [...prev.contents, newContent.trim()],
      }));
      setNewContent('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple validations
  if (!formData.name.trim()) return alert('Course name is required.');
  if (!formData.teacher) return alert('Teacher is required.');
  if (!formData.category) return alert('Category is required.');
  if (isNaN(Number(formData.limit)) || Number(formData.limit) <= 0) return alert('Limit must be a positive number.');
  if (!formData.startDate) return alert('Start date is required.');
  if (formData.contents.length === 0) return alert('Add at least one course content.');
  if (schedules.length === 0) return alert('Add at least one schedule.');

    const payload = {
      ...formData,
      schedules, // Include the dynamic schedule list
      institute_id:instituteInfo._id,
      images
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      // console.log(result);
      if(res.status == 201){
        toast.success(result.message)
        navigate('/institute/courses')
      }
    toast.error(result.message)
      // Show success toast or navigate
    } catch (error) {
      console.error("Error creating course:", error.message);
    }
  };

  return (
    <div className='px-5 lg:px-45'>
      <div className="w-full lg:w-3/4 mx-auto mb-5 mt-5">
        <h1 className='mt-10 text-3xl'>Create Course Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className='my-5'>
            <label className='text-gray-500 text-sm'>Course Name</label>
            <input name="name" value={formData.name} onChange={handleChange}
              type="text" className="border p-2 rounded-md w-full" required />
          </div>

          {/* Teacher & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className='text-gray-500 text-sm'>Teacher</label>
              <select name="teacher" onChange={handleChange} value={formData.teacher}
                className="border p-2 rounded-md w-full" required>
                <option value="">Select</option>
                {
                    members?.map((member,index)=>(
                        <option value={member?._id}>{member?.name}</option>
                    ))
                }
              </select>
            </div>
            <div>
              <label className='text-gray-500 text-sm'>Category</label>
              <select name="category" onChange={handleChange} value={formData.category}
                className="border p-2 rounded-md w-full" required>
                <option value="">Select</option>
                <option value="Technology">Technology</option>
                <option value="Japanese">Japanese</option>
              </select>
            </div>
          </div>

          {/* Fees and Certificate */}
          <div className="grid grid-cols-2 gap-3 my-5">
            <input name="limit" value={formData.limit} onChange={handleChange}
              type="number" placeholder='Student Limit' className="border p-2 rounded-md w-full" required />
            <input name="currentFee" value={formData.currentFee} onChange={handleChange}
              type="number" placeholder='Current Fee' className="border p-2 rounded-md w-full" required />
            <input name="originalFee" value={formData.originalFee} onChange={handleChange}
              type="number" placeholder='Original Fee' className="border p-2 rounded-md w-full" required />
            <div className="flex items-center mt-6 gap-2">
              <input type="checkbox" name="certificate" checked={formData.certificate} onChange={handleChange} />
              <label>Give Certificate?</label>
            </div>
          </div>

          {/* Duration and Start */}
          <div className="grid grid-cols-2 gap-3 my-5">
            <div>
                 <label htmlFor="">Course Duration</label>
                <input name="duration" value={formData.duration} onChange={handleChange}
              type="text" placeholder='Course Duration' className="border p-2 rounded-md w-full" required />
            </div>
            <div>
                <label htmlFor="">Start Date</label>
                <input name="startDate" value={formData.startDate} onChange={handleChange}
              type="date" className="border p-2 rounded-md w-full" required />
            </div>
          </div>

          {/* Schedule */}
          <div className="grid grid-cols-2 gap-3 my-5 border rounded-md p-3">
            <div>
              <label>Course Dates</label>
              <select value={newSchedule.day} onChange={(e) => setNewSchedule({ ...newSchedule, day: e.target.value })}
                className="border p-2 rounded-md w-full" >
                <option value="">Day</option>
                 <option value="MON">MON</option>
                 <option value="TUES">TUES</option>
                 <option value="WED">WED</option>
                 <option value="THURS">THURS</option>
                 <option value="FRI">FRI</option>
                 <option value="SAT">SAT</option>
                 <option value="SUN">SUN</option>
                {/* add others */}
              </select>
              <label>Course Times</label>
              <input type="time" value={newSchedule.time}
                onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                className="border p-2 rounded-md w-full"  />
              <button type="button" onClick={handleAddSchedule} className="bg-black text-white p-2 rounded-md mt-3">Add</button>
            </div>
            <div>
              {schedules.map((s, i) => (
                <div key={i}>{s.day} {s.time} <span className='text-red-500 cursor-pointer'>Delete</span></div>
              ))}
            </div>
          </div>

          {/* Class Type */}
          <div className='my-5'>
            <label>Class Type</label>
            <select name="classType" value={formData.classType} onChange={handleChange}
              className="border p-2 rounded-md w-full" required>
              <option value="">Select</option>
              <option value="In-person">In person</option>
              <option value="Online">Online</option>
            </select>
          </div>

          {/* About */}
          <div className='my-5'>
            <label>About</label>
            <textarea name="about" value={formData.about} onChange={handleChange}
              rows={5} className="border p-2 rounded-md w-full" required />
          </div>

          {/* Video */}
          <div className='my-5'>
            <label>Course Video (YouTube)</label>
            <input name="video" value={formData.video} onChange={handleChange}
              type="text" className="border p-2 rounded-md w-full" placeholder='Link' />
          </div>

          {/* Course Contents */}
          <div className='my-5'>
            <label>Course Contents</label>
            <input value={newContent} onChange={(e) => setNewContent(e.target.value)}
              type="text" placeholder='eg. HTML' className="border p-2 rounded-md w-full" />
            <button type="button" onClick={handleAddContent}
              className="bg-gray-600 text-white p-2 mt-2 rounded-md">Add Content</button>
            <div className="mt-2">
              {formData.contents.map((c, i) => (
                <div key={i} className="flex items-center gap-2"><BiDiamond /> {c}</div>
              ))}
            </div>
          </div>
                <div className="my-5">
                <div className="flex gap-2 my-3">
                    {
                    images?.map((img,index)=>(
                        <img key={index} src={img} className='w-20 border h-20 rounded-md border-gray-500' alt="" />
                    ))
                }
                </div>
                <MultipleImageUpload handleImages={handleImages}/>
              </div>

          <button type="submit" className='bg-black text-white p-2 w-full rounded-md'>Create Course</button>
        </form>
      </div>
    </div>
  );
}

export default CreateCoursePage;
