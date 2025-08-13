import jwt from "jsonwebtoken"
export const generateTokenandsaveinCookies=async(id,res)=>{
   
   
         const token=jwt.sign({id},"TsTs))$$",{
          expiresIn:"1h"
         });

 console.log("token fron generate token :",token)

 //setting token in cookie
 
   res.cookie("jwt",token,{
    httpOnly:true,
    secure:false,
    sameSite:"none",
    path:"/",
    maxAge:60 * 60 * 1000
   })

   return token;
   
}