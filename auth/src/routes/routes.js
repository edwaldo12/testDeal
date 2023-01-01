import { Router, json } from "express";
import {
  loginUser,
  refreshedToken,
  getToken,
} from "../controllers/controllers.js";

const router = Router({
  caseSensitive: true,
});

const jsonParser = json();

router.post("/api/login-user", jsonParser, loginUser);
router.post("/api/create-token", jsonParser, refreshedToken);
router.post("/api/get-token", jsonParser, getToken);
export default router;
