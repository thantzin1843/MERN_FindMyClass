import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Array of image URLs or paths
    default: [],
  },
  video: {
    type: String, // URL or path to course intro or preview video
  },
  about: {
    type: String,
  },
  contents: [String],
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  student_limit: {
    type: Number,
    required: true,
  },
  current_fee: {
    type: Number,
    required: true,
  },
  original_fee: {
    type: Number,
  },
  category: {
    type: String,
    required: true,
  },
  duration: {
    type: String, // Duration in hours, days, or weeks (you can define the unit)
    required: true,
  },
  type: {
    type: String,
    enum: ["In-person", "Online"],
    required: true,
  },
  certificate: {
    type: Boolean,
    default: false,
  },
  start_date: {
    type: Date,
    required: true,
  },
  schedules: [
    {
      day: {
        type: String,
        enum: ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"],
        required: true,
      },
      time: {
        type: String, // e.g., "9:00AM"
        required: true,
      }
    }
  ],
  status: {
    type: String,
    enum: ["active", "inactive", "upcoming", "completed"],
    default: "upcoming",
  },
  institute_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institute",
    required: true,
  }
}, { timestamps: true });

const Course = mongoose.models?.Course || mongoose.model("Course", courseSchema);
export default Course;
