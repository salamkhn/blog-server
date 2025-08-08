
export const validator=(blogSchema)=>(req,res,next)=>{
 const result=blogSchema.safeParse(req.method === "GET" ? req.query : req.body);
 console.log("result in validator :",result)
 if(!result.success) {
   const firstError=result.error.issues[0];
   return res.status(400).json({
   message:firstError.message,
   success:false
  })
 }
  req.validData=result.data
  next()
}