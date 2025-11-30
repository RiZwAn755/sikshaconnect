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
  // friend list
  friendlist: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
],
//  Incoming friend requests
  friendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  //  Requests user has sent to others
  sentRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]

});

userSchema.index({ username: 1 , password: 1}); // compound indexing
const User = mongoose.model("User", userSchema);
export default User;