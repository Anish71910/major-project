import jwt from "jsonwebtoken";
import User from "../models/User.js";

// protect: verifies the JWT sent in the Authorization header.
// Attaches the logged-in user (minus password) to req.user for later routes.
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

// authorize: restricts a route to specific roles.
// Usage: router.post("/events", protect, authorize("organizer", "admin"), createEvent)
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Not allowed for your role" });
    }
    next();
  };
};
