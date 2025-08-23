import jwt from "jsonwebtoken"

export const isAuthentication=(req,res,next)=>{

  try{
     const token=req.cookies?.jwt;
   

  
  //validation
  if(!token){
    return res.status(404).json({
      message:"Login first",
      success:false
    })
  }
   
  //token verifying
  const verifyuser=jwt.verify(token,process.env.JWT_SECRET)
  
  if(!verifyuser){
    return res.status(401).json({
      message:"Invalid crendentials && unauthorized"
    })
  }
    
   req.userId=verifyuser.id
  next()

  }catch(err){
    return res.status(500).json({
      message:"again login to perform activities",
      success:false
    })

  }
}