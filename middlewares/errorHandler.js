
export const errorHandler=(err,req,res,next)=>{
   return res.status(500).json({
      messages:err.message,
      success:false
   })
}