import  jwt  from "jsonwebtoken";
import Institute from "../models/Institute.js";
import bcrypt from "bcryptjs";
import Staff from "../models/Staff.js";
import Course from "../models/Course.js";
import Enrolled from "../models/Enrolled.js";

export const signup = async(req, res) =>{
    try {
        const {
            founder,instituteInfo
        } =  req.body;
        console.log(founder, instituteInfo)
        // Check user already exists or not 
        let institute = await Institute.findOne({email:instituteInfo?.email})
        if(institute){
            res.status(400).json({
                "message":"This email is already registered!"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(instituteInfo?.password,salt)
        institute = await Institute.create({
            name:instituteInfo?.name,
            email:instituteInfo?.email,
            password:hashedPassword,
            phone:instituteInfo?.phone,
            category:instituteInfo?.category,
            type:instituteInfo?.type,
            address:instituteInfo?.address,
            about:instituteInfo?.about,
            logo:instituteInfo?.logo,
            role:"institute"
        })
        // save founder info
        const staff = new Staff({
            name:founder?.name,
            email:founder?.email,
            education:founder?.education,
            gender:founder?.gender,
            phone:founder?.phone,
            position:founder?.position,
            profile:founder?.profile,
            institute_id:institute?._id
        })
        await staff.save()
        // jwt sign
        const payload = {institute:{id:institute?._id,role:"institute"}};
        jwt.sign(payload,process.env.JWT_SECRET,(err,token)=>{
            if(err) throw new Error("Jwt sign error") 
            res.status(201).json({
                message:"Successfully signup.",institute,token
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
        let institute = await Institute.findOne({email})
        if(!institute){
            res.status(404).json({
                "message":"Institute Not Found"
            })
        }
        if(institute?.status !== "active"){
            res.status(400).json({
                "message":"Institute account not available now. Contact Admin"
            })
        }
        const matchPassword = await bcrypt.compare(password,institute?.password)
        if(!matchPassword) res.status(400).json({"message":"Incorrect password"})
        // jwt sign
        const payload = {institute:{id:institute?._id,role:"institute"}};
        jwt.sign(payload,process.env.JWT_SECRET,(err,token)=>{
            if(err) throw new Error("Jwt sign error") 
            res.status(201).json({
                message:"Successfully login.",institute,token
            })
        })
    } catch (error) {
        res.status(500).json({message:error?.message})
    }
}

// get profile
export const getProfile = async(req, res) =>{
    try {
        const {id} = req.params;
        const institute = await Institute.findById(id);
        if(!institute){
            res.status(404).json({
                "message":"Institute Not Found"
            })
        }
        res.status(200).json(institute)
    } catch (error) {
        console.log(error.message)
    }
}

// edit profile (not tested yet)
export const updateProfile = async (req, res) => {
  try {
    const {
      id,
      name,
      email,
      phone,
      category,
      type,
      address,
      about,
      logo,
      images,
      contact,
      payments
    } = req.body;

    const institute = await Institute.findById(id);

    if (!institute) {
      return res.status(404).json({
        message: "Institute Not Found"
      });
    }

    // Update fields only if provided
    institute.name = name || institute.name;
    institute.email = email || institute.email;
    institute.phone = phone?.filter(p => p.trim() !== "") || institute.phone;
    institute.category = category || institute.category;
    institute.type = type || institute.type;
    institute.address = address || institute.address;
    institute.about = about || institute.about;
    institute.logo = logo || institute.logo;
    institute.images = images || institute.images;
    institute.contact = contact || institute.contact;
    institute.payments = payments || institute.payments;
    const updatedInstitute = await institute.save();

    return res.status(200).json({
      message: "Institute profile updated successfully",
      data: updatedInstitute
    });

  } catch (error) {
    console.error("Edit Profile Error:", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// get members 
export const getStaffs = async(req, res) =>{
    try {
        const {institute_id} = req.params
        const staffs = await Staff.find({institute_id:institute_id})
        res.status(200).json(staffs)
    } catch (error) {
      res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
    }
}

// create staff
export const createStaff = async(req, res) =>{
    try {
        const {
            name,
            email,
            education,
            gender,
            phone,
            position,
            profile,
            institute_id
        } = req.body
        const staff = new Staff({
            name,
            email,
            education,
            gender,
            phone,
            position,
            profile,
            institute_id
        })
        await staff.save()
        res.status(201).json(staff)
    } catch (error) {
         res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// delete staff
export const deleteStaff = async(req, res) =>{
    try {
        const {id} = req.params;
        await Staff.findByIdAndDelete(id);
        res.status(200).json({
            message:"Staff Deleted Successfully."
        })
    } catch (error) {
         res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const getInstitutes = async(req, res) =>{
    try {
        const institutes = await Institute.find()
        res.status(200).json(institutes)
    } catch (error) {
      res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
    }
}

export const getInstituteDetail = async(req, res) =>{
    try {
        const {id} = req.params;
        const institute = await Institute.findById(id);
        const members = await Staff.find({institute_id:id})
        const courses = await Course.find({institute_id:id}).populate("instructor")
        if(!institute){
            res.status(404).json({
                "message":"Institute Not Found"
            })
        }
        res.status(200).json({institute,members,courses});
    } catch (error) {
        console.log(error.message)
    }
}

// admin change insittute status
export const changeStatus = async(req, res) =>{
    try {
        const {id,status} = req.body;
        const institute = await Institute.findById(id);
        if(!institute){
            res.status(404).json({message:'Institute Not Found'})
        }
        institute.status = status;
        await institute.save();
       
        res.status(200).json(institute);
    } catch (error) {
        console.log(error.message)
    }
}


// 
// GET /api/enroll/course/:id
export const getEnrolledByCourse = async (req, res) => {
  try {
    const enrollments = await Enrolled.find({ course_id: req.params.course_id })
                        .populate("user_id") // get student info
                        .populate("course_id", "name");     // optional: get course name
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
