import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Core middleware
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

// Health check — useful to confirm the server is alive
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Event Booking API is running" });
});

// Feature routes (more will be added as phases progress)
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
