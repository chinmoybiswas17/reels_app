import bcrypt from "bcryptjs";
import mongoose, { model, models, Schema } from "mongoose";

export const VIDEO_DIMENSIONS={
    width:1080,
    height:1920
} as const
export interface IUser {
  title: string;
  description: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  videoUrl:string
  thubmnailUrl:string;
  controls?:boolean
}