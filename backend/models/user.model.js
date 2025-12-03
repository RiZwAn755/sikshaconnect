import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
 
  friendlist: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
],

  friendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  
  sentRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  
   refreshToken:{
    type: String
   }

});

userSchema.index({ username: 1}); 
const User = mongoose.model("User", userSchema);
export default User;