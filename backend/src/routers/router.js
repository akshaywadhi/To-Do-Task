import express from "express";
import {
  signup,
  login,
  addTask,
  editTask,
  getAllTask,
  deleteTask,
  getUser,
} from "../controllers/controller.js";
import { auth } from "../middleware/auth.js";


const router = express.Router();

router

  .get("/getAllTask", auth, getAllTask)
  .get("/getUser", auth, getUser)
  .post("/signup", signup)
  .post("/login", login)
  .post("/addTask", auth, addTask)
  .put("/editTask/:taskId", auth, editTask)
  .delete("/deleteTask/:deleteId", auth, deleteTask);

export default router;
