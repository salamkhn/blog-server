import express from "express";
import { userRouter } from "./router/userRoute.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import dbCon from "./dbCon/dbsCon.js";
import { blogRouter } from "./router/blogRouter.js";
import  cors  from "cors";
dbCon()
const app=express();

//middle wares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(errorHandler)

const coreOptions={
  origin:true,
  credentials:true,
  method:['POST','GET','PATCH','DELETE'],
  allowedHeader:['Content-type','Authorization']
}
app.use(cors(coreOptions))

// user router
app.use("/api/user",userRouter)
//blog router
app.use("/api/blog",blogRouter)


//server running get Route
app.get("/",(req,res)=>{
 res.send("Server is Running..")
})

//listing
const Port=3333
app.listen(Port,()=>{
console.log(`server is listening at port ${Port}`)
})