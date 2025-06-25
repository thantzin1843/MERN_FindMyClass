import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  institute_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institute",
    required: true,
  }
}, { timestamps: true });

const Review = mongoose.models?.Review || mongoose.model("Review", reviewSchema);
export default Review;
