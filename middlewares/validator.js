
export const validator=(blogSchema)=>(req,res,next)=>{
 

  if(req.file){
    req.body.userprofile=req.file.originalname
  }
    
  
 const result=blogSchema.safeParse(req.method === "GET" ? req.query : req.body);

 if(!result.success) {
   const firstError=result.error.issues[0];
   return res.status(400).json({
   message:firstError.message,
   success:false
  })
 }
  req.validData=result.data
  console.log("validator function finished")
  next()
}