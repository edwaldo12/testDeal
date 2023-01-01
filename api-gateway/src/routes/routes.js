import Router from "express";
import {
  getTokenFromRefreshedToken,
  loginGateway,
  refreshingToken,
} from "../controllers/auth.js";
import verifyToken from "../middleware/index.js";
import {
  createUsers,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";

const router = Router({
  caseSensitive: true,
});

// router.post("/api/login-user", jsonParser, loginUser);

router.post("/login", loginGateway);
router.get("/users", verifyToken, getUsers);
router.post("/refresh-token", refreshingToken);
router.post("/generate-new-token", getTokenFromRefreshedToken);

router.get("/users", verifyToken, getUsers);
router.get("/user/:id", verifyToken, getUser);
router.post("/users", verifyToken, createUsers);
router.put("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);

export default router;
