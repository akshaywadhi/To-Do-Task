import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/router.js";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();
const Port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(Port, () => {
  console.log("Server Is Running On Port 5001");
  connectDB();
});
