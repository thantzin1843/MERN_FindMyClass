import express from 'express'
import { updateEnrollStatus } from '../controllers/EnrollController.js';

const enrolledRouter = express.Router()

enrolledRouter.patch("/update-status/:id", updateEnrollStatus);

export default enrolledRouter