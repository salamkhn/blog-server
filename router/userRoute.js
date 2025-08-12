import { Router } from "express";
import { userLogin, userRegister } from "../controller/userController.js";
import {z} from "zod";
import { validator } from "../middlewares/validator.js";
import { upload } from "../middlewares/upload.js";


// for create user_Schema

export const createuserSchema=z.object({
  userName:z.string().min(3,"userName atleast 3 character long",).max(25,"userName cannot exceed 25 character"),
  email:z.email("basic email formate email invalid").lowercase().refine(v=> /^[\w]+(?:[-_.][\w]+)*@[a-z0-9]+(?:[-_.][\w]+)*\.[A-Za-z]{2,}$/i.test(v),{
    message:'invalid email'
  }),
  
  password:z.string("password must be a string").min(6,"password should atleast 6 character long"),
  phoneNumber:z.string().min(8,"phoneNumber should be 8 digit long").max(15,'phoneNumber cannot exceed 15 digit').refine(v=>/^\+?[0-9]+$/.test(v),{
    message:"phoneNumber only contain + and from 0-9"
  }),
  role:z.enum(["admin","user"],{
    message:"only admin and user allowed"
  }),

  userprofile:z.string().refine(v=>/\.(png|jpg|jpeg|webp)$/i.test(v),{
    message:"Only .png, .jpg, .jpeg, .webp Allowed"
  })
})

// // for update user_Schema
export const loginSchema=createuserSchema.optional()

export const userRouter=Router()

// @=> Purpose userRegister
//@=> method post
// @endpoint=>api/user/register
 userRouter.post("/register",upload.single("userprofile"),validator(createuserSchema),userRegister)

 // @=> Purpose userRegister
//@=> method post
// @endpoint=>api/user/signup

 userRouter.post("/login",validator(loginSchema),userLogin)