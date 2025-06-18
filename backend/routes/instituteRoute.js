import express from 'express'
import { createStaff, deleteStaff, getProfile, getStaffs, login, signup, updateProfile } from '../controllers/InstituteController.js';
import { instituteOnly, protectInstituteAccess } from '../middlewares/AuthMiddleware.js';
import { getCourses } from '../controllers/CourseController.js';

const instituteRouter = express.Router();

instituteRouter.post('/login',login);
instituteRouter.post('/signup',signup);

instituteRouter.get('/:id',protectInstituteAccess,instituteOnly,getProfile);
instituteRouter.put('/updateProfile',protectInstituteAccess,instituteOnly,updateProfile);
instituteRouter.get('/:institute_id/staffs',protectInstituteAccess,instituteOnly, getStaffs);
instituteRouter.delete('/staffs/:id',protectInstituteAccess,instituteOnly, deleteStaff);
instituteRouter.post('/createStaff',protectInstituteAccess,instituteOnly, createStaff);

// course
instituteRouter.get('/:institute_id/courses',protectInstituteAccess,instituteOnly, getCourses);


export default instituteRouter;