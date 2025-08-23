import mongoose from "mongoose";

const dbCon=()=>{
try{
  mongoose.connect(process.env.MONGO_URI)
 
}catch(err){
  console.log("err in bdsCon :",err)
}
}
export default dbCon