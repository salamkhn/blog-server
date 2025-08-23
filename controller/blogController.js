
import mongoose from "mongoose"

import { Blog } from "../model/blogModel.js"

import cloudinary from "../config/Cloudionary.js"

//Step:1 setting Cloudinary Setup


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
 
    
      const savedBlog=await blogData.save()   
    
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

//get userspecificBlogs
export const userSpecificBlogs=async(req,res,next)=>{
  try{
    const userID=req.params.userId;

    // find blog with the help of user id
    const userSpecificBlogs = await Blog.find({ Author:userID }); // Standard
   

    return res.status(200).json({
      message:"these blogs found :",
      userSpecificBlogs,
      success:true
    })
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