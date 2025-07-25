import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "24kb" }));
app.use(express.urlencoded({ extended: true, limit: "24kb" }));
app.use(express.static("public"));
app.use(cookieParser());


//routes
import userRoutes from "./routes/user.routes.js"
import taskRoutes from "./routes/tasks.routes.js"

//routes Declaration
app.use("/api/v1/tasks", taskRoutes)
app.use("/api/v1/users", userRoutes)


export { app };
