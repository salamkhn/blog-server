import mongoose from "mongoose"
import { minLength } from "zod"


//user Schema
const userSchema=mongoose.Schema({
  userName:{
    type:String,
    required:[true,'userName required'],
    minlength:[3,'userName atleast 3 character long'],
    maxlength:[25,'userName cannot exceed 25 character']
  },
  email:{
    type:String,
    lowercase:true,
    required:[true,'Email required'],
    unique:true,
    match:/^[\w]+(?:[-_.][\w]+)*@[a-z0-9]+(?:[-_.][\w]+)*\.[A-Za-z]{2,}$/

  },
  password:{
    type:String,
    minlength:[6,"password should be 6 char long"],
    required:[true,'password required'],
    select:false
  },
  phoneNumber:{
    type:String,
    required:[true,'phoneNumber required and must be in digit'],
    match:/^\+?[0-9]+$/,
    minlength:8,
    maxlength:16
    
  },
  role:{
    type:String,
    enum:{
      values:["admin","user"],
      message:"{VALUE} is not valide"
    },
    default:"user"
  },
  userprofile:{
    type:String,
    required:[true,"userProfile required"],
    validate:{
     validator:function(v){
      return /\.(png|jpg|jpeg|webp)$/i.test(v)
     },
     message:props=>`${props.value} is not a valid image extension' (png,jpg,jpeg,webp only allowed)`
    }
  }

},{timestamps:true})

//userModle
export const User=mongoose.model("User",userSchema)

