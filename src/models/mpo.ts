import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    dd: { type:String},
    aa: { type:String},
    deletedAt: Date

  },
  { collection: 'mpos',timestamps: true }
);



const User = mongoose.model("User", userSchema);
export default User;
