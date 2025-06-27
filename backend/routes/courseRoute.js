import express from 'express'
import { instituteOnly, protectAccess, protectInstituteAccess } from '../middlewares/AuthMiddleware.js';
import { changeCourseStatus, createCourse, getCourseDetail, getCourses, getUserCourses, enroll, getEnrolledCourseForUser, deleteCourseIfNoEnrolled } from '../controllers/CourseController.js';

const courseRouter = express.Router();

courseRouter.post('/',protectInstituteAccess,instituteOnly,createCourse);
courseRouter.get('/',getUserCourses);
courseRouter.get('/latest',getCourses);
courseRouter.get('/:id',getCourseDetail);

// institute
courseRouter.put('/changeStatus',protectInstituteAccess,instituteOnly,changeCourseStatus);
courseRouter.delete('/:id',protectInstituteAccess,instituteOnly,deleteCourseIfNoEnrolled);
// enroll
courseRouter.post('/enroll',protectAccess,enroll)
courseRouter.get('/enroll_courses/:user_id',protectAccess,getEnrolledCourseForUser)

export default courseRouter
