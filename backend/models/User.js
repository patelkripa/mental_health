import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Only for normal auth
    googleId: { type: String, unique: true, sparse: true }, // For Google Auth
    profilePicture: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User; // ✅ Use ES module export
