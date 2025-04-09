import jwt from "jsonwebtoken";
import "dotenv/config";

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Authorization token is missing",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
    };
    next();
  } catch (err) {
    switch (err.name) {
      case "JsonWebTokenError":
        return res.status(401).json({
          status: "error",
          message: "Invalid token",
        });
      case "TokenExpiredError":
        return res.status(401).json({
          status: "error",
          message: "Token has expired",
        });
      default:
        console.error("Some error:", err);
        return res.status(500).json({
          status: "error",
          message: "Internal server error during authentication",
        });
    }
  }
};

