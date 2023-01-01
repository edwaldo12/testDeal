import UserModel from "../models/model.js";
import refreshToken from "../models/refresh_token.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { keyJWT, keyRefresh } from "../config/auth.js";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const userLogin = await UserModel.findOne({ username: username });

  if (!userLogin) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Invalid user or password." });
  }
  const verifiedToken = jwt.sign({ userLogin }, keyJWT, { expiresIn: "1h" });
  res.setHeader("x-access-token", verifiedToken);

  const refreshToken = jwt.sign({ userLogin }, keyRefresh, {
    expiresIn: "1d",
  });

  bcrypt.compare(password, userLogin.password).then(() => {
    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      samsite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 60,
    });
    res.status(200).json({
      status: 200,
      userLogin: userLogin,
      refreshToken: refreshToken,
    });
  });
  return;
};

export const refreshedToken = async (req, res) => {
  try {
    let userId = req.body._id;
    let tokenUser = req.body.refresh_token;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        Message: "user not found!",
      });
    }

    const newRefreshToken = new refreshToken({
      token: tokenUser,
      user: user,
    });

    const newToken = await newRefreshToken.save();
    return res.status(200).json({
      status: "Success",
      data: {
        token: newToken.token,
        user: newToken.user,
      },
    });
  } catch (error) {
    return res.status(400).json({ errormsg: error });
  }
};
