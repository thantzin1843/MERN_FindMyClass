
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import { connectToDB } from './configs/db.js';
import Course from './models/Course.js';
import Institute from './models/Institute.js';
import Staff from './models/Staff.js';
import Review from './models/Review.js';

dotenv.config()

export const seedData = async() =>{
    try {
        await connectToDB()
        await User.deleteMany();
        await Institute.deleteMany();
        await Staff.deleteMany();
        await Course.deleteMany();
        await Review.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("admin123", salt)

        const user = await User.create({
            "name":"admin",
            "email":"admin@example.com",
            "password":hashedPassword,
            "role":"admin"
        })
        console.log("User seeded")
        process.exit()
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }

}

seedData()