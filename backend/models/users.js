import db from "../config/db.js";
import { userSchema } from "./schema.js";

export class User {
  constructor() {
    this.table = "users";
    this.init()
  }

  async createUser(user) {
    const { username, phone, email, password, user_id, created_at } = user;
    const query = `INSERT INTO ${this.table} (username,phone, email, password,user_id,created_at) VALUES (?, ?, ?,?,?,?)`;
    const [result] = await db.execute(query, [
      username,
      phone,
      email,
      password,
      user_id,
      created_at,
    ]);
    return result;
  }

  async findUserByEmail(email) {
    const query = `SELECT * FROM ${this.table} WHERE email = ?`;
    const [rows] = await db.execute(query, [email]);
    return rows[0];
  }

  async init(){
    await db.execute(userSchema)
  }
}
