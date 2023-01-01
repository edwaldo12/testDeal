import jwt from "jsonwebtoken";
import { keyJWT } from "../config/auth.js";

export default async function verifyToken(req, res, next) {
  let tokenUser = req.headers["x-access-token"];

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
  let role = decoded.role;

  if (role != "Admin") {
    return res.status(403).json({
      Message: "Sorry you aren't authorized too do this process!",
    });
  }

  next();
}
