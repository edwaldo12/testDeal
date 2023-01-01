import Router from "express";
import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userControllers.js";
import verifyToken from "../middleware/index.js";

import { loginUser, refreshedToken } from "../controllers/authController.js";
const router = Router({
  caseSensitive: true,
});

router.post("/api/add-user", verifyToken, addUser);
router.get("/api/get-users", getUsers);
router.get("/api/get-user/:id", getUser);
router.put("/api/update-user/:id", verifyToken, updateUser);
router.delete("/api/delete-user/:id", verifyToken, deleteUser);

//user
router.post("/api/login-user", loginUser);
router.post("/api/refresh-token", refreshedToken);
export default router;
