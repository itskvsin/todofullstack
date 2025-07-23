import { Router } from "express";
import { registerTask } from "../controllers/tasks.controller.js";

const router = Router();

router.route("/addTask").get(registerTask);

export default router;
