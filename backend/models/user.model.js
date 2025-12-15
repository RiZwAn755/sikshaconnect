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
  refreshToken: {
    type: String
  },
  friends: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: []
  }

});

const User = mongoose.model("User", userSchema);
export default User;