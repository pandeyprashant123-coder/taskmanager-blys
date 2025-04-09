import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { uuidv7 } from "uuidv7";

import bcrypt from "bcrypt";
import { User } from "../models/users.js";
const generateToken = (id, user_type) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }
  return jwt.sign({ id, user_type }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { phone, password, confirm_password, email, username } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userId = uuidv7();
  const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  const user = {
    phone,
    password: hashedPassword,
    email,
    username,
    user_id: userId,
    created_at,
  };
  const db = new User();

  try {
    const existingUser = await db.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await db.createUser(user);
    if (!newUser) {
      return res.status(400).json({ message: "Error creating user" });
    }
    const token = generateToken(userId);
    res
      .status(201)
      .json({ message: "User registered successfully", token, user });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const db = new User();
  try {
    const user = await db.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user.user_id);
    res.status(200).json({ token, message: "Login successful", user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
