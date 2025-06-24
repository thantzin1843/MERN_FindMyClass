import mongoose from "mongoose";

const instituteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  logo: {
    type: String,
  },
  phone: {
    type: [String], 
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: [{name:String,link:String}],
  payments: [{name:String,qr:String, receiver:String}],
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "pending"],
    default: "pending",
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["school", "college", "university", "training center","institute", "other"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  images:[String],
  role:{
    type:String,
    default:"institute"
  },
}, { timestamps: true });

const Institute = mongoose.models?.Institute || mongoose.model("Institute", instituteSchema);
export default Institute;
