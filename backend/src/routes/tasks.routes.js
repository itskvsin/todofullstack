import { Router } from "express";
import { registerTask, getTasks } from "../controllers/tasks.controller.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/addTask").post(verifyJwt,registerTask);

router.route("/getTasks").get(verifyJwt,getTasks);

export default router;
