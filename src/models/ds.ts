import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    a: { type:String},
    f: { type:String},
    deletedAt: Date

  },
  { collection: 'dss',timestamps: true }
);



const User = mongoose.model("User", userSchema);
export default User;
