import  jwt  from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async(req, res) =>{
    try {
        const {name, email,password} =  req.body;
        // Check user already exists or not 
        let user = await User.findOne({email})
        if(user){
            res.status(400).json({
                "message":"This email is already registered!"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        user = await User.create({name,email,password:hashedPassword,role:"user"})
        // jwt sign
        const payload = {user:{id:user?._id,role:user?.role}};
        jwt.sign(payload,process.env.JWT_SECRET,(err,token)=>{
            if(err) throw new Error("Jwt sign error") 
            res.status(200).json({
                message:"Successfully signup.",
                userInfo:{name:user?.name,email:user?.email, role: user?.role,id:user?._id},
                token
            })
        })
    } catch (error) {
        res.status(500).json({message:error?.message})
    }
}

// login 
export const login = async(req, res) =>{
    try {
        const {email,password} =  req.body;
        // Check user already exists or not 
        let user = await User.findOne({email})
        if(!user){
            res.status(400).json({
                "message":"Credential Not Found"
            })
        }
        const matchPassword = await bcrypt.compare(password,user?.password)
        if(!matchPassword) res.status(400).json({"message":"Incorrect password"})
        // jwt sign
        const payload = {user:{id:user?._id,role:user?.role}};
        jwt.sign(payload,process.env.JWT_SECRET,(err,token)=>{
            if(err) throw new Error("Jwt sign error") 
            res.status(200).json({
                message:"Successfully login.",
                userInfo:{name:user?.name,email:user?.email, role: user?.role,id:user?._id},
                token
            })
        })
    } catch (error) {
        res.status(500).json({message:error?.message})
    }
}