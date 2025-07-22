import { Router } from "express";
import { registerUser } from "../controllers/register.controllers.js";
import { upload } from "../middlewares/multer.middleares.js";

const router = Router();

router.route("/register").post(upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]),registerUser);

export default router;
