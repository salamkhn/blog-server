import { Router } from "express";
import {z} from "zod"
import { allBlogs, createBlog, deleteBlog, updateBlog, } from "../controller/blogController.js";
export const blogRouter=Router()
import { validator } from "../middlewares/validator.js";

// zod validation
export const  blogSchema=z.object({
title:z.string().min(12,"title must be between 12 to 120 character long").max(120).default("untitled blog").optional(),
category:z.enum(["education", "tech", "branding", "health", "kirana", "marketing", "sales"]).optional(),
content:z.string().min(200,"blog content must be 200 characters long").optional(),
image:z.string().url().refine(v=>/\.(png|jpg|jpeg|webp)$/i.test(v),{
  message:"Only .png, .jpg, .jpeg, .webp Allowed"
}).optional(), 

})


// @methods=>post
// @purpose =>createBlog
// @endpoing=>api/blog/create
blogRouter.post("/create",validator(blogSchema),createBlog)

// @methods=>get
// @purpose =>get all blogs
// @endpoing=>api/blog/allblogs
blogRouter.get("/allblogs",allBlogs)

// @methods=>patch
// @purpose =>update blog
// @endpoing=>api/blog/updateblog
blogRouter.patch("/updateblog/:id",validator(blogSchema),updateBlog)

//@methods =>delete
//@purpose =>delete-Blog
//@endpoing =>api/blog/updateblog
blogRouter.delete("/deleteblog/:id",deleteBlog)

