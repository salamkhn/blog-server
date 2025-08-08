import { Router } from "express";
import { userRegister } from "../controller/userController.js";

export const userRouter=Router()

// @=> Purpose userRegister
//@=> method post
// @endpoint=>api/user/register
 userRouter.post("/user/register",userRegister)

 // @=> Purpose userRegister
//@=> method post
// @endpoint=>api/user/signup
 userRouter.post("/user/signup",userRegister)