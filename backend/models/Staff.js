import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: [String], // Array of phone numbers
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  profile: {
    type: String, // URL or path to profile picture
  },
  position: {
    type: String,
    required: true,
  },
  education:[String],
  institute_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institute",
    required: true,
  }
}, { timestamps: true });

const Staff = mongoose.models?.Staff || mongoose.model("Staff", staffSchema);
export default Staff;
