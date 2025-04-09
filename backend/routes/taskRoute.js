import express from "express";
import { authenticate } from "../middlewares/AuthMiddleware.js";
import { createTask, deleteTask, editTask, getAllUserTasks } from "../controllers/taskController.js";

const router = express.Router();

router.post("/tasks", authenticate, createTask);
router.get("/tasks", authenticate, getAllUserTasks);
router.patch("/tasks/:id",authenticate,editTask) 
router.delete("/tasks/:id",authenticate,deleteTask)
export default router;

