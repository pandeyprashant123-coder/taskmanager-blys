import db from "../config/db.js";
import { taskSchema } from "./schema.js";

export class Task {
  constructor() {
    this.table = "tasks";
    this.init();
  }

  async createTask(task) {
    const { user_id, title, body, created_at } = task;
    const query = `INSERT INTO ${this.table} (title,body, created_at,user_id) VALUES (?, ?, ?, ?)`;
    const [result] = await db.execute(query, [
      title,
      body,
      created_at,
      user_id,
    ]);
    return result;
  }
  async getAllUserTasks(user_id) {
    const query = `SELECT * FROM ${this.table} where user_id = ?`;
    const [rows] = await db.execute(query, [user_id]);
    return rows;
  }
  async updateTask(task_id, task) {
    const { title, body } = task;
    const query = `UPDATE ${this.table} SET title = ?, body = ? WHERE id = ?`;
    const [result] = await db.execute(query, [title, body, task_id]);
    return result;
  }
  async deleteTask(task_id) {
    const query = `DELETE FROM ${this.table} WHERE id = ?`;
    const [result] = await db.execute(query, [task_id]);
    return result;
  }
  async init() {
    await db.execute(taskSchema);
  }
}
