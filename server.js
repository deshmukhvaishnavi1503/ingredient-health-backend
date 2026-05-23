import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import analyzeRoutes from "./routes/analysisRoutes.js";

const app = express();

/* ===============================
   Middleware
================================= */

// Allow frontend connection
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// JSON body parser (large base64 images allowed)
app.use(express.json({ limit: "25mb" }));

/* ===============================
   Health Check Route
================================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Ingredient Health API Running Successfully",
  });
});

/* ===============================
   IMPORTANT: Main Analyze Route
   Final Endpoint:
   http://localhost:5001/api/analyze
================================= */
app.use("/api", analyzeRoutes);

/* ===============================
   Simple Route Debug Test
================================= */
app.get("/api/test", (req, res) => {
  res.json({ message: "API route working properly ✅" });
});

/* ===============================
   404 Handler
================================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ===============================
   Global Error Handler
================================= */
app.use((err, req, res, next) => {
  console.error("🔥 Global Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Server error",
  });
});

/* ===============================
   Start Server
================================= */
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

});
