import Enrolled from "../models/Enrolled.js";

// PATCH /api/enroll/update-status/:id
export const updateEnrollStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Validate status value
    const validStatuses = ["pending", "approve", "reject"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const updated = await Enrolled.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("user_id").populate("course_id");

    if (!updated) {
      return res.status(404).json({ message: "Enrolled student not found." });
    }

    res.status(200).json({
      message: "Status updated successfully.",
      data: updated,
    });
  } catch (error) {
    console.error("Update status error:", error.message);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};
