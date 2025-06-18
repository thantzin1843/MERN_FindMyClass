// models/Course.js (Assuming you have a Course model already)
import Course from '../models/Course.js'

export const createCourse = async (req, res) => {
  try {
    const {
      name,
      teacher,
      category,
      limit,
      currentFee,
      originalFee,
      certificate,
      duration,
      startDate,
      classType,
      about,
      video,
      schedules,
      contents,
      institute_id,
      images
    } = req.body;

    // Basic Validation
    if (!name || !teacher || !category || !limit || !currentFee || !duration || !startDate || !classType || !about) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Optional: validate array types
    if (!Array.isArray(schedules) || !Array.isArray(contents)) {
      return res.status(400).json({ message: "Schedules and contents must be arrays." });
    }

    // Create new course
    const course = new Course({
      name,
      instructor:teacher,
      category,
      student_limit:limit,
      current_fee:currentFee,
      original_fee:originalFee,
      certificate,
      duration,
      start_date:startDate,
      type:classType,
      about,
      video,
      schedules,
      contents,
      institute_id,
      images
    });

    await course.save();

    res.status(201).json({ message: "Course created successfully", course });

  } catch (error) {
    console.error("Create course error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCourses = async(req, res) =>{
    try {
        const courses = await Course.find().populate('instructor').populate('institute_id')
        res.status(200).json(courses)
    } catch (error) {
      res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
    }
}

export const getCourseDetail = async(req, res) =>{
    try {
        const {id} = req.params
        const courses = await Course.findById(id).populate('instructor').populate('institute_id')
        res.status(200).json(courses)
    } catch (error) {
      res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
    }
}