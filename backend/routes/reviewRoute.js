import express from 'express'
import { protectAccess } from '../middlewares/AuthMiddleware.js'
import { createReview, getReviewsByInstitute } from '../controllers/ReviewController.js'


const reviewRouter = express.Router()

reviewRouter.post('/',protectAccess,createReview);
reviewRouter.get("/:institute_id", getReviewsByInstitute);

export default reviewRouter