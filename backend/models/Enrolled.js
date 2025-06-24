import mongoose from "mongoose";

const enrolledSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
    email: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  status: {
    type: String,
    enum: ["pending", "approve", "reject"],
    default: "pending",
  },
  selected_payment: {
    type: String,
    enum: ["KBZpay", "WavePay", "AYApay"],
  },
  payment_status: {
    type: Boolean,
    default: false,
  },
  payment_image: {
    type: String, // Store image URL or path
  },
}, { timestamps: true });

const Enrolled = mongoose.models?.Enrolled || mongoose.model("Enrolled", enrolledSchema);
export default Enrolled;
