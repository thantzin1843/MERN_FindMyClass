import React, { useEffect, useState } from "react";
import { BsStar } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from 'sonner';

function EnrolledCourseList() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [rating, setRating] = useState(0)
  const [show, setShow] = useState(false)
  const [reviewSchool, setReviewSchool] = useState("")
  const [reviewSchoolId, setReviewSchoolId] = useState("")
  const [comment, setComment] = useState("")
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/course/enroll_courses/${userInfo.id}`,
          {
            method:'get',
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        console.log(data)
        setEnrollments(data?.enrolledData);
      } catch (err) {
        console.error("Failed to fetch enrollments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [userInfo?.id]);

  const handleReviewForm = (name,id) =>{
    setReviewSchool(name)
    setReviewSchoolId(id)
    setShow(true)
  }

  const handleReview = async(e) =>{
    e.preventDefault();
    const payload = {
      user_id:userInfo?.id,
      institute_id:reviewSchoolId,
      rating,
      comment
    }

    try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Review submitted successfully!");
      setShow(false)
    } else {
      toast.error(data.message || "Failed to submit review.");
    }
  } catch (error) {
    console.error(error.message);
    toast.error("Something went wrong.");
  }
  }

  if (loading) return <div>Loading...</div>;

  if (!enrollments.length) return <div>No enrolled courses yet.</div>;

  return (
    <div className="px-4 py-6 relative">
      <div className={`fixed ${show ? 'flex':"hidden"} justify-center items-center z-20 top-0 w-full h-screen `}>
        <form onSubmit={handleReview} className="bg-white rounded-md p-5 w-5/6 lg:w-1/3 border shadow-lg relative">
          <IoCloseCircle className="absolute top-5 right-5" onClick={()=>setShow(false)} size={30} />
          <div className="text-3xl text-center my-3">Review Form <br /><span className="text-sm">{reviewSchool}</span></div>
          <div className="my-2">
            <label htmlFor="">Rating</label>
            <div>{
            [1,2,3,4,5].map((r)=>(
              <BsStar className='inline me-2' size={25} color={r <= rating && 'red' } onClick={()=>setRating(r)}/>
            ))
            }</div>
          </div>
            <div className="my-3">
            <label htmlFor="">Comment</label>
            <div>
              <textarea onChange={(e)=>setComment(e.target.value)} value={comment} name="" className="border border-gray-600 rounded-md w-full"  rows={6} id=""></textarea>
            </div>
          </div>
          <button type="submit" className="bg-black text-white px-5 py-2 rounded-md">Submit Review</button>
        </form>
      </div>
      <h1 className="text-xl font-semibold mb-4">My Enrolled Courses</h1>
      <div className="space-y-4 grid grid-cols-1 lg:grid-cols-3">
        {enrollments.map((enroll) => (
          <div
            key={enroll._id}
            className="border border-gray-300 rounded-md p-4 shadow-sm"
          >
            <Link to={`/courses/${enroll?.course_id?._id}`}><img src={enroll?.course_id?.images?.[0]} className="w-full h-[250px] object-center " alt="" /></Link>
            <h2 className="text-lg font-bold">{enroll.course_id?.name}</h2>
            <p className="text-sm text-gray-600">
              Institute: {enroll.course_id?.institute_id?.name}
            </p>
            <p>Status: <span className="font-medium capitalize bg-amber-400 px-3 text-sm  rounded-full">{enroll.status}</span></p>
            <p>Payment: {enroll.payment_status ? "Paid" : "Not Paid"}</p>
            <p className="text-sm text-gray-500">
              Enrolled at: {new Date(enroll.createdAt).toLocaleDateString()}
            </p>
            {enroll?.status == "approve" && <button onClick={()=>handleReviewForm(enroll?.course_id?.institute_id?.name,enroll?.course_id?.institute_id?._id)} className="underline">Give Review to {enroll?.course_id?.institute_id?.type}</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EnrolledCourseList;
