import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./env"
})

const port = process.env.PORT || 3000;

connectDB()