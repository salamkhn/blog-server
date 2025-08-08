import { Router } from "express";
import {z} from "zod"
import { allBlogs, createBlog, updateBlogs, } from "../controller/blogController.js";
export const blogRouter=Router()
import { validator } from "../middlewares/validator.js";

// zod validation
export const  blogSchema=z.object({
title:z.string()
.min(12,"title must be between 12 to 120 character long").max(120),
category:z.enum(["education", "tech", "branding", "health", "kirana", "marketing", "sales"]),
image:z.string().url().refine(v=>/\.(png|jpg|jpeg|webp)$/i.test(v),{
  message:"Only .png, .jpg, .jpeg, .webp Allowed"
}),
content:z.string().min(200,"blog content must be 200 characters long")
})


// @methos=>post
// @purpose =>createBlog
// @endpoing=>api/blog/create
blogRouter.post("/create",validator(blogSchema),createBlog)

// @methos=>get
// @purpose =>get all blogs
// @endpoing=>api/blog/allblogs
blogRouter.get("/allblogs",allBlogs)

// @methos=>patch
// @purpose =>update blog
// @endpoing=>api/blog/updateblog
blogRouter.patch("/updateblog/:id",validator(blogSchema),updateBlogs)

