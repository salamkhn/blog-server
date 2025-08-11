import { Router } from "express";
import { userRegister } from "../controller/userController.js";
import {z} from "zod";
import { validator } from "../middlewares/validator.js";


// for create user_Schema
export const createuserSchema=z.object({
  userName:z.string().min(3,"userName atleast 3 character long",).max(25,"userName cannot exceed 25 character").required(true,"userName required"),
  email:z.email("basic email formate email invalid").lowercase().refine(v=> /^[\w]+(?:[-_.][\w]+)*@[a-z0-9]+(?:[-_.][\w]+)*\.[A-Za-z]{2,}$/i.test(v),{
    message:'invalid email'
  }),

  password:z.string().min(6,"password should atleast 6 character long"),
  phoneNumber:z.string().min(8,"phoneNumber should be 8 digit long").max(15,'phoneNumber cannot exceed 15 digit').regex(/^\+?[0-9]+$/,"invalid phone number"),
  role:z.enum(["admin","user"],{
    message:"only admin and use allowed"
  }),
  userprofile:z.string().refine(v=>/\.(png|jpg|jpeg|webp)$/i.test(v),{
    message:"Only .png, .jpg, .jpeg, .webp Allowed"
  })
})

// // for update user_Schema
// export const updateuserSchema=z.object(
//    Object.fromEntries(
//     Object.entries(createuserSchema).map(([key,schema])=>[key,schema.optional()])
//    )
// )


export const userRouter=Router()

// @=> Purpose userRegister
//@=> method post
// @endpoint=>api/user/register
 userRouter.post("/user/register",validator(createuserSchema),userRegister)

 // @=> Purpose userRegister
//@=> method post
// @endpoint=>api/user/signup
 userRouter.post("/user/signup",validator(createuserSchema),userRegister)