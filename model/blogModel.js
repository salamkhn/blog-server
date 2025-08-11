import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: [true, "title is required"],
    minlength: [12, "Title must be at least 12 characters long"],
    maxlength: [120, "Title cannot exceed 120 characters"],
    trim: true
  },
  category: {  
    type: String,
    required: [true, "Category is required"],
    enum: {
      values: ["education", "tech", "branding", "health", "kirana", "marketing", "sales"],
      message: "${VALUE} is not a valid category"
    },
    lowercase: true,
    trim: true
  },
  image: {  
    type: String,
    required: [true, "Blog image is required"],
    validate: {
      validator: function(v) {
        return /\.(jpg|jpeg|png|webp)$/i.test(v);
      },
      message: props => `${props.value} is not a valid image URL`
    }
  },
  content: {  
    type: String,
    required: [true, "Blog content is required"],
    minlength: [200, "Blog content must be at least 200 characters long"]
  },

}, {
  timestamps: true  
});

export const Blog = mongoose.model("Blog", blogSchema);  
