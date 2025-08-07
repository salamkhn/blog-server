import express from "express";

const app=express();


app.get("/",(req,res)=>{
 res.send("hello salam kasa huu app")
})
//listing
const Port=3333
app.listen(Port,()=>{
console.log(`server is listening at port ${Port}`)
})