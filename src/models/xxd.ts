import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    dd: { type:},
    deletedAt: Date

  },
  { collection: 'xxds',timestamps: true }
);



const User = mongoose.model("User", userSchema);
export default User;
