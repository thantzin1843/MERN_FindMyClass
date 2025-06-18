import mongoose from "mongoose"

export const connectToDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("db connected successfully")
    } catch (error) {
        console.log(error.message)
    }
}