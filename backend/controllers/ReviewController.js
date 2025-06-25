import Review from "../models/Review.js";


export const createReview = async (req, res) => {
  try {
    const { user_id, institute_id, rating, comment } = req.body;

    // Optional: check if the user already reviewed this institute
    const existingReview = await Review.findOne({ user_id, institute_id });
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this institute." });
    }

    const review = new Review({
      user_id,
      institute_id,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({
      message: "Review saved successfully.",
      review,
    });
  } catch (error) {
    console.error("Create review error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getReviewsByInstitute = async (req, res) => {
  try {
    const { institute_id } = req.params;

    const reviews = await Review.find({ institute_id })
      .populate("user_id", "name email profile") // populate only selected fields
      .sort({ createdAt: -1 }); // newest first (optional)

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
