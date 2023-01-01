"use strict";

import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tanggal_lahir: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const UserModel = model("User", userSchema);

export default UserModel;
