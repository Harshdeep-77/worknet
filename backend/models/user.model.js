import { json } from "express";
import mongoose,{Schema} from "mongoose";


const UserSchema=new mongoose.Schema({
    name: {
    type: String,
    required: true, // must have a name
    trim: true       // removes extra spaces
  },
  username: {
    type: String,
    required: true,
    unique: true,    // no two people can have the same username
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true  // makes sure email is always stored in lowercase
  },
  active: {
    type: Boolean,
    default: true     // new accounts are active by default
  },
  password: {
    type: String,
    required: true    // we’ll store the hashed password, not plain text
  },
  profilePicture: {
    type: String,
    default: "default.jpg"       // empty string if user hasn't uploaded a pic
  },
  createdAt: {
    type: Date,
    default: Date.now // automatically set when user signs up
  },
  token: {
    type: String,
    default: ""       // for email verification / password reset
  }
});


const User=mongoose.model("User",UserSchema);
export default User;