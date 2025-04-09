import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";

import TaskRoute from "./routes/taskRoute.js";
import cors from "cors";
import AuthRoute from "./routes/AuthRoutes.js";

const app = express();
const apiRoute = "/api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler: function (req, res) {
      return res.status(429).json({
        error: "You sent too many requests. Please wait a while then try again",
      });
    },
  })
);

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: "Hello!" });
});

app.use(`${apiRoute}/v1`, [TaskRoute, AuthRoute]);

const PORT =process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
