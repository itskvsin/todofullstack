import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(async () => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((error) => {
    console.log("Error connecting to database:", error);
  });
