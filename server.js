import { config } from "dotenv";
config()
import express from "express";
import { userRouter } from "./router/userRoute.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import dbCon from "./dbCon/dbsCon.js";
import { blogRouter } from "./router/blogRouter.js";
import  cors  from "cors";
import cookieParser from "cookie-parser";
dbCon()
const app=express();

//middle wares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const coreOptions={
  origin:[
      "https://blog-frontendsite.vercel.app",
      "http://localhost:5173" 
  ],
  credentials:true,
  methods:['POST','GET','PATCH','DELETE'],
  allowedHeaders:['Content-type','Authorization'],
}
app.use(cors(coreOptions))
app.use(cookieParser())

// user router
app.use("/api/user",userRouter)
//blog router
app.use("/api/blog",blogRouter)


//server running get Route
app.get("/",(req,res)=>{
 res.send("Server is Running..")
})

app.use(errorHandler)
//listing
const Port=process.env.PORT || 3333
app.listen(Port,()=>{
console.log(`server is listening at port ${Port}`)
})