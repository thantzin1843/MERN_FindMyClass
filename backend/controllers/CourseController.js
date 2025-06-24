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

// for user
export const getUserCourses = async(req, res) =>{
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
// for institute
export const getCourses = async(req, res) =>{
    try {
        const {institute_id} = req.params
        const courses = await Course.find({institute_id:institute_id}).populate('instructor').populate('institute_id')
        res.status(200).json(courses)
    } catch (error) {
      res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
    }
}

// latest courses
export const getLatestCourses = async(req, res) =>{
    try {
        const courses = await Course.find()
                              .sort({ createdAt: -1 }) // Sort by latest
                              .limit(10)               // Limit to 10 results
                              .populate('instructor').populate('institute_id')
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

export const changeCourseStatus = async(req, res) =>{
    try {
        const {id,status} = req.body;
        const course = await Course.findById(id);
        if(!course){
            res.status(404).json({message:'course Not Found'})
        }
        course.status = status;
        await course.save();
       
        res.status(200).json(course);
    } catch (error) {
        console.log(error.message)
    }
}

import Enrolled from "../models/Enrolled.js";

export const enroll = async (req, res) => {
  try {
    const {
      name,
      email,
      user_id,
      course_id,
      phone,
      gender,
      selected_payment,
      payment_status,
      payment_image,
    } = req.body;

    // Validate required fields
    if (!user_id || !course_id || !phone || !gender) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Optional: Prevent duplicate enrollment
    const alreadyEnrolled = await Enrolled.findOne({ user_id, course_id });
    if (alreadyEnrolled) {
      return res.status(409).json({ message: "Already enrolled in this course." });
    }

    // Create new enrollment
    const newEnrollment = new Enrolled({
      name,
      email,
      user_id,
      course_id,
      phone,
      gender,
      selected_payment: selected_payment || null,
      payment_image : payment_image || null,
      payment_status : payment_status ? true :  false,
    });

    await newEnrollment.save();

    res.status(201).json({
      message: "Enrollment submitted successfully.",
      enrollment: newEnrollment,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// get user's enrolled course

export const getEnrolledCourseForUser = async(req,res) =>{
  try {
    const {user_id} = req.params;
    const enrolledData = await Enrolled.find({user_id:user_id})
                              .populate({
                                path: 'course_id',
                                populate: {
                                  path: 'institute_id',
                                  model: 'Institute', // make sure this matches your model name
                                },
                              })
      res.status(201).json({
      message: "Enrollment submitted successfully.",
      enrolledData
    });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}