import jwt, { decode } from "jsonwebtoken";
import User from "../models/User.js";
import Institute from "../models/Institute.js";

// either logged in or not
export const protectAccess = async(req,res,next) =>{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
           try {
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token,process.env.JWT_SECRET);
                req.user = await User.findById(decoded?.user?._id).select("-password")
                next();
           } catch (error) {
                res.json({
                    "message":"Not authorized , token failed"
                })
           }
        }else{
            res.status(400).json({
                "message":"Not authorized , token not provided"
            })
        }
}

// admin only
export const adminOnly = async(req, res,next) =>{
    if(req.user && req.user.role == "admin" ){
        next()
    }else{
         res.status(401).json({message:"Not authorized as admin"})
    }
}

// institute only
export const protectInstituteAccess = async(req,res,next) =>{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
           try {
                token = req.headers.authorization.split(" ")[1];
                const decoded =jwt.verify(token,process.env.JWT_SECRET);
                console.log(decoded)
                req.institute = await Institute.findById(decoded?.institute?.id).select("-password")
                next();
           } catch (error) {
                res.json(error.message)
           }
        }else{
            res.status(400).json({
                "message":"Not authorized , token not provided"
            })
        }
}

export const instituteOnly = async(req, res,next) =>{
    if(req.institute && req.institute.role == "institute" ){
        next()
    }else{
         res.status(401).json({message:"Not authorized as institute"})
    }
}

// image upload
export const imageKitAuth = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
}