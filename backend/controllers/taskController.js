import { Task } from "../models/task.js";

export const getAllUserTasks = async (req, res) => {
  try {
    const db = new Task();
    const tasks = await db.getAllUserTasks(req.user.id);
    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        message: "No task found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    console.error("Error fetching Tasks:", error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Server Error",
    });
  }
};


export const createTask = async (req, res) => {
  try {
    const { title, body } = req.body;
    const db = new Task();
    const user_id = req.user.id;
    const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
    const newTask = await db.createTask({
      title,
      body,
      created_at,
      user_id,
    });
    if (!newTask) {
      return res.status(400).json({
        status: "error",
        message: "Error creating task",
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Task successfully created",
      task: newTask,
    });
  } catch (err) {
    console.error("Error creating Task:", err);
    return res.status(500).json({
      status: "error",
      message: err.message || "Error creating product",
    });
  }
};

export const editTask = async (req, res) => {
  try {
    const { title, body } = req.body;
    const db = new Task();
    const task_id = req.params.id;
    const updatedTask = await db.updateTask(task_id, {
      title,
      body,
    });
    if (!updatedTask) {
      return res.status(404).json({
        status: "error",
        message: "Error updating task",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Task successfully updated",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating Task:", error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Error updating Task",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const db = new Task();
    const task_id = req.params.id;
    const deletedTask = await db.deleteTask(task_id);
    if (!deletedTask) {
      return res.status(404).json({
        status: "error",
        message: "Error deleting task",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Product successfully deleted",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message || "Error deleting product",
    });
  }
};
