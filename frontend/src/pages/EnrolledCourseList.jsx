import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function EnrolledCourseList() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

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

  if (loading) return <div>Loading...</div>;

  if (!enrollments.length) return <div>No enrolled courses yet.</div>;

  return (
    <div className="px-4 py-6">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default EnrolledCourseList;
