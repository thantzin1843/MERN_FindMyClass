import express from 'express'
import { instituteOnly, protectInstituteAccess } from '../middlewares/AuthMiddleware.js';
import { createCourse, getCourseDetail, getCourses } from '../controllers/CourseController.js';

const courseRouter = express.Router();

courseRouter.post('/',protectInstituteAccess,instituteOnly,createCourse);
courseRouter.get('/',getCourses);
courseRouter.get('/:id',getCourseDetail);

export default courseRouter
