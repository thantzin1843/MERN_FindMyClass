import React, { useEffect, useState } from "react";
import { FiXCircle } from "react-icons/fi";
import { useParams } from "react-router-dom";

function EnrolledStudents() {
  const { id } = useParams(); // course_id
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("")
  const [show, setShow] = useState(false)
  const [img, setImg] = useState("");

  useEffect(() => {
    const fetchEnrolled = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/institute/${id}/enrolled_students`, {
        method:'get',
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setStudents(data);
        setName(data[0]?.course_id?.name)
        console.log(data)
      } catch (error) {
        console.error("Failed to load enrolled students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolled();
  }, [id]);

  const handleStatusChange = async (enroll_id, status) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/enroll/update-status/${enroll_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();
    if (res.ok) {
      // Optionally update local UI or refetch data
      console.log("Status updated successfully:", data);
      // toast.success("Status updated successfully");
    } else {
      console.error("Failed to update status:", data.message);
      // toast.error("Failed to update status");
    }
  } catch (error) {
    console.error("Error updating status:", error.message);
    // toast.error("Something went wrong");
  }
};

const showImage = (img) =>{
    setImg(img)
    setShow(true);
}


  if (loading) return <div className="p-4">Loading...</div>;

  if (!students.length) return <div className="p-4 text-gray-500">No students enrolled yet.</div>;

  return (
    <div className='px-5 lg:px-45 '>
      <div className="w-full lg:w-3/4 mx-auto mb-5 mt-5 relative">
        <div className={`${show ?'block' : 'hidden'} absolute w-full bg-white h-[500px] p-5 rounded-md border `}>
        <div className="flex justify-between ">
            <h3>Payment Image</h3>
            <div><FiXCircle size={30} onClick={()=>setShow(false)}/></div>
        
        </div>
        <img src={img} className="w-full mt-5" alt="" />
        </div>
      <h2 className="text-2xl font-bold mb-6 mt-15">Enrolled Students for {name}</h2>
        <div className="mb-3 text-xl">Total Students: {students?.length}</div>
      <div className="grid gap-4">
        {students.map((enroll) => (
          <div key={enroll._id} className="border border-gray-300 rounded-md p-4 shadow-sm">
            <div className="flex flex-col md:flex-row md:justify-between mb-3">
              <div>
                <p><strong>Name:</strong> {enroll.name}</p>
                <p><strong>Email:</strong> {enroll.email}</p>
                <p><strong>Phone:</strong> {enroll.phone}</p>
                <p><strong>Gender:</strong> {enroll.gender}</p>
              </div>
              <div>
                <p><strong>Status:</strong>
                    <select
                    onChange={(e) => handleStatusChange(enroll._id, e.target.value)}
                    className={`ml-2 border rounded-md font-medium
                        ${enroll.status === 'approve' ? 'text-green-600'
                        : enroll.status === 'reject' ? 'text-red-500'
                        : 'text-yellow-600'}`}
                    >
                    <option value="pending" selected={enroll?.status == "pending"}  className="text-yellow-600">Pending</option>
                    <option value="approve" selected={enroll?.status == "approve"}  className="text-green-600">Approve</option>
                    <option value="reject"  selected={enroll?.status == "reject"} className="text-red-500">Reject</option>
                    </select>
                </p>
                <p><strong>Payment Method:</strong> {enroll.selected_payment || "N/A"}</p>
                <p><strong>Payment Status:</strong> {enroll.payment_status ? "✅ Paid" : "❌ Not Paid"}</p>
                <p className="text-sm text-gray-500">
                Enrolled at: {new Date(enroll.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {enroll.payment_image && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-1">Payment Screenshot:</p>
                <img
                  src={enroll.payment_image}
                  alt="payment proof"
                  className="w-32 border rounded-md"
                  onClick={()=>showImage(enroll.payment_image)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default EnrolledStudents;
