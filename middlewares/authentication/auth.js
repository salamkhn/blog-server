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
  const verifyuser=jwt.verify(token,"TsTs))$$")
  
  if(!verifyuser){
    return res.status(401).json({
      message:"Invalid crendentials && unauthorized"
    })
  }
  
   console.log("verfyed token :",verifyuser)
    
   req.userId=verifyuser.id
  console.log("req.userId :",req.userId)
   console.log("now out from the authenticated")
  next()

  }catch(err){
    return res.status(500).json({
      message:"invalid or expire token",
      success:false
    })

  }
}