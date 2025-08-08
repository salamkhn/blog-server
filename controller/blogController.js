

import { success } from "zod"
import { Blog } from "../model/blogModel.js"
// create Blog
export const createBlog=async(req,res,next)=>{
  try{
    const {title,category,image,content}=req.body
  
    const blogData=new Blog({
     title,
     category,
     image,
     content
    })

    await blogData.save()
    
    //success response
    return res.status(201).json({
      message:"blog saved successfully to dbs",
      success:true,
      blogData
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
export const updateBlogs=async(req,res,next)=>{
  const id=req.params.id

  console.log("id of the blogs :",id)
   
try{
   const {title,category,image,content}=req.body

   const blogDetails={
    title,
    category,
    image,
    content
   }
  
  const blog=await Blog.findByIdAndUpdate(id,
    blogDetails
  ,{new:true})
 
  //validation
  if(!blog){
  return res.status(404).json({
    message:"blog not found",
    success:false
  })
  }

  //success response
 return res.status(201).json({
  message:"blog updated successfully",
  success:true,
 })
}catch(err){
  next(err)
}
}