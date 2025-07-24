import { Router } from "express";
import {
  registerTask,
  getTasks,
  updateTasks,
  deleteTask,
} from "../controllers/tasks.controller.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/addTask").post(verifyJwt, registerTask);

router.route("/getTasks").get(verifyJwt, getTasks);

router.route("/updateTask/:taskId").put(verifyJwt, updateTasks);

router.route("/deleteTask/:taskId").delete(verifyJwt, deleteTask);

export default router;
