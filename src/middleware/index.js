import jwt from "jsonwebtoken";
import { keyJWT, keyRefresh } from "../config/auth.js";

export default async function verifyToken(req, res, next) {
  let tokenUser = req.headers["x-access-token"];
  // let cookieUser = req.headers["set-cookie"];
  // let getRefreshToken = cookieUser[0].split(";")[0].split("=")[1];

  if (!tokenUser) {
    return res.status(403).json({
      Message: "Login first!",
    });
  }

  let decoded = jwt.verify(tokenUser, keyJWT, (err, decoded) => {
    if (err) {
      return res.status(400).json({
        Message: "invalid token!",
      });
    }
    return decoded;
  });

  let role = decoded.userLogin.role;

  if (role != "Admin") {
    return res.status(403).json({
      Message: "Sorry you aren't authorized too do this process!",
    });
  }

  next();
}
