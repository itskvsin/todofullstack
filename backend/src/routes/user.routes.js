import { Router } from "express";
import { registerUser } from "../controllers/register.controllers.js";

const router = Router();

router.route("/register").get(registerUser)

export default router;
