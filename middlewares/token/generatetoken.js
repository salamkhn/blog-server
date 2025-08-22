import jwt from "jsonwebtoken"
export const generateTokenandsaveinCookies=async(id,res)=>{
   
   
         const token= jwt.sign({id},"TsTs))$$",{
          expiresIn:"1h"
         });

 console.log("token from generate token :",token)

 //setting token in cookie
 
    await res.cookie("jwt",token,{
    httpOnly:true,
    secure:false,
    sameSite:"lax",
    path:"/",
    maxAge:5 * 60 * 1000 *1000
   })



   return token;
   
}