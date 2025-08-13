
import mongoose from "mongoose"

import { Blog } from "../model/blogModel.js"

import { v2 as cloudinary } from 'cloudinary';

//Step:1 setting Cloudinary Setup
  cloudinary.config({ 
        cloud_name: 'djboaeuys', 
        api_key: '297579552564668', 
        api_secret: 'PIx5qMF_9Q_jvrAQPbTsgTju3Ok'
    });
    
// Step:2 setting multer => i do it as an middleware


   
// Step:3 Create blog Controller
export const createBlog=async(req,res,next)=>{
  try{
    const {title,category,content}=req.body
    //validation for not present
     if(!req.file){
      return res.status(400).json({
        message:"image is required"
      })
    }

    // upload direct from buffer to Cloudinary!
    const uploadImage=await new Promise((resolve,reject)=>{
    cloudinary.uploader.upload_stream(
      {folder:"blog-Images"},
      (error,result)=>{
        if(error) reject(error)
        else resolve(result)
      }
    ).end(req.file.buffer)
   })

   
   const blogData=new Blog({
     title,
     category,
     image:uploadImage.secure_url,
     content,
     Author:req.userId
    })
    console.log("data of req.userId :",req.userId)
    
      const savedBlog=await blogData.save()
    
      console.log('savedBlog :',savedBlog)

   
    
    //success response
     if(savedBlog){
      return res.status(201).json({
      message:"blog saved successfully to dbs",
      success:true,
      blogData
    })
     }

    
  }catch(err){
    next(err)
  }

}


// fetch Allblogs
export const allBlogs=async(req,res,next)=>{
 try{
   
   const allblogs=await Blog.find({})

   //validation
   if(!allblogs || allblogs.length === 0){
     return res.status(404).json({
       message:"Blogs not found",
       success:false
     })
   }
  //success response
   console.log("allblogs :",allblogs)

  return res.status(200).json({
    message:"All Blogs",
    Blogs:allblogs,
    success:true
  })
 }catch(err){
  next(err)
 }
}

//update blog
export const updateBlog=async(req,res,next)=>{
  const id=req.params.id


   
try{
   const {title,category,image,content}=req.body

   const blogFields={}
   if(title !== undefined) blogFields.title =title;
   if(category !== undefined) blogFields.category=category;
   if(image !== undefined) blogFields.image =image;
   if(content !== undefined) blogFields.content=content

  console.log("title of blogs :",title)
 
  
  const blog=await Blog.findByIdAndUpdate(id,
  blogFields,
  {new:true})
 
  //validation
  if(!blog){
  return res.status(404).json({
    message:"blog not found",
    success:false
  })
  }

  //success response
 return res.status(200).json({
  message:"blog updated successfully",
  success:true,
  date:blog
 })
}catch(err){
  next(err)
}
}

//delete blog
export const deleteBlog=async(req,res,next)=>{
  const id=req.params.id

  if(!mongoose.Types.ObjectId.isValid(id)){

    return res.status(400).json({
      message:"Invalid blog id formate",
      success:false
    })
  }

  try{

    const blog=await Blog.findByIdAndDelete(id)

    //validation
    if(!blog){
      return res.status(404).json({
        message:"blog not found",
        success:false
      })
    }

    //success response
    return res.status(200).json({
      message:"blog deleted successfully",
      success:true
    })    
  }catch(err){
   next(err)
  }
}