import express from 'express'
import dotenv from 'dotenv' 
import cors from 'cors'
import userRouter from './routes/userRoute.js';
import { connectToDB } from './configs/db.js';
import instituteRouter from './routes/instituteRoute.js';
import courseRouter from './routes/courseRoute.js';
import uploadRouter from './routes/ImageUploadRoute.js';
import enrolledRouter from './routes/EnrollRoute.js';
import reviewRouter from './routes/reviewRoute.js';

const app = express();
dotenv.config()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 9000;
await connectToDB();

app.get('/',(req,res)=>{
    res.send("Welcome express")
})

app.use('/api/user',userRouter)
app.use('/api/institute', instituteRouter)
app.use('/api/course', courseRouter)
app.use('/api/enroll', enrolledRouter)
app.use('/api/reviews', reviewRouter)

app.use('/auth',uploadRouter)
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

// npm install imagekit --save