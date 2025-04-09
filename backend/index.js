import "dotenv/config";
import express from "express";

import TaskRoute from "./routes/taskRoute.js";
import cors from "cors";
import AuthRoute from "./routes/AuthRoutes.js";

const app = express();
const apiRoute = "/api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello!" });
});

app.use(`${apiRoute}/v1`, [TaskRoute, AuthRoute]);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
