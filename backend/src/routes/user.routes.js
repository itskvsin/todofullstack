import { Router } from "express";
import {
  registerUser,
  loginUser,
  logout,
  currentUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleares.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJwt, logout);
router.route("/current-user").get(verifyJwt, currentUser);

export default router;
