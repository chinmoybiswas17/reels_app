import bcrypt from "bcryptjs";
import { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Use function expression instead of arrow function for `this` binding
userSchema.pre("save", async function (next) {
  const user = this as IUser;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = models?.User || model<IUser>("User", userSchema);

export default User;
