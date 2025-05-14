import mongoose, { version } from "mongoose";
import { model, Schema } from "mongoose";

const authSchema = Schema(
  {
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);

export const User = model("User", authSchema);
