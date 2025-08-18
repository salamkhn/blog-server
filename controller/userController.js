import { v2 as cloudinary } from 'cloudinary';
import { User } from "../model/userModel.js";
import bcryptjs from "bcryptjs"
import  jwt  from 'jsonwebtoken';
import { generateTokenandsaveinCookies } from '../middlewares/token/generatetoken.js';
import { success } from 'zod';



//step:1 cloudionary setup

  cloudinary.config({ 
        cloud_name: 'djboaeuys', 
        api_key: '297579552564668', 
        api_secret: 'PIx5qMF_9Q_jvrAQPbTsgTju3Ok'
    });

//userregister function
export const userRegister=async(req,res,next)=>{
  
  const {userName,email,password,phoneNumber,role,userprofile}=req.validData;
try{ 

    // validation
    const exist=await User.findOne({email});

    if(exist){
      return res.status(400).json({
        message:"already exist choose another email",
        success:false
      })
    } 

   if(!req.file){
    return res.status(400).json({
      message:"user image required",
      success:false
    })
   }

      //logic for hashing password
  const hashedPassword=await bcryptjs.hash(password,10);

   //mading new promise
   const userProfile=await new Promise((resolve,reject)=>{
   cloudinary.uploader.upload_stream(
    {folder:"user-Images"},
    (err,result)=>{
      if(err)reject(err)
      else resolve(result)
    }
   ).end(req.file.buffer)
   })

   //user profile details
   const userDetail=new User({
    userName,
    email,
    password:hashedPassword,
    phoneNumber,
    role,
    userprofile:userProfile.secure_url
   })

   // saving to dbs
 await userDetail.save()

 //success response 
 res.status(200).json({
  message:"register successfully as a ",
  success:true,
  userDetail
 })

}catch(err){
  next(err)
}
}

//usersignup function
export const userLogin=async(req,res,next)=>{
  try{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
      return res.status(401).json({
        message:"invalid login details!",
        success:false
      })
    }  
    
    
    //validation checking
    const isPasswordValid=await bcryptjs.compare(password,user.password)  
   
  if(!isPasswordValid){
   return res.status(401).json({
    message:"invalid login details!",
    success:false
   })
  }

  // token generating
  const token=await generateTokenandsaveinCookies(user._id,res)

  return res.status(200).json({
    message:"user logedin successfully",
    success:true,
    token,
    userID:user._id
  })
  }catch(err){
    next(err)
  }

}

//getAllusers function
export const allusers=async(req,res,next)=>{
    try{
   const users=await User.find({});

  if(!users || users.length ===0 ){
    return res.status(404).json({
      message:"users not found",
      success:false
    })
  }
  //success response
  return res.status(200).json({
    message:"all users fetched successfully",
    success:true,
    users
  })

    }catch(err){
      next(err)
    }
}

// logout function
export const userLogout=async(req,res,next)=>{
  try{
      res.clearCookie('jwt',{
        httpOnly:true,
        secure:false,
      })

      return res.status(200).json({
        message:'user logout successfully',
        success:true
      })

  }catch(err){
    console.log(err)
  }
}