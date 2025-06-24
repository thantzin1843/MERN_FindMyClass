import express from 'express'
import { changeStatus, createStaff, deleteStaff, getEnrolledByCourse, getInstituteDetail, getInstitutes, getProfile, 
    getStaffs, login, signup, updateProfile } from '../controllers/InstituteController.js';
import { adminOnly, instituteOnly, protectAccess, protectInstituteAccess } from '../middlewares/AuthMiddleware.js';
import { getCourses } from '../controllers/CourseController.js';

const instituteRouter = express.Router();

instituteRouter.post('/login',login);
instituteRouter.post('/signup',signup);

// user routes
instituteRouter.get('/',getInstitutes);
instituteRouter.get('/user/:id',getInstituteDetail);
// institute dashboard routes
instituteRouter.get('/:id',protectInstituteAccess,instituteOnly,getProfile);
instituteRouter.put('/updateProfile',protectInstituteAccess,instituteOnly,updateProfile);

instituteRouter.get('/:institute_id/staffs',protectInstituteAccess,instituteOnly, getStaffs);
instituteRouter.delete('/staffs/:id',protectInstituteAccess,instituteOnly, deleteStaff);
instituteRouter.post('/createStaff',protectInstituteAccess,instituteOnly, createStaff);

instituteRouter.get('/:course_id/enrolled_students',protectInstituteAccess,instituteOnly, getEnrolledByCourse);

// course
instituteRouter.get('/:institute_id/courses',protectInstituteAccess,instituteOnly, getCourses);

// admin
instituteRouter.put('/changeStatus',protectAccess,adminOnly,changeStatus);




export default instituteRouter;