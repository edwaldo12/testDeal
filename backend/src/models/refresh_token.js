import mongoose, { model, Schema } from "mongoose";

const refreshTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  expiryDate: Date,
});

const refreshToken = model("refreshToken", refreshTokenSchema); 

export default refreshToken;
