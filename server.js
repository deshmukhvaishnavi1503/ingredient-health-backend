import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import analyzeRoutes from "./routes/analysisRoutes.js";

const app = express();

/* ===============================
   CORS CONFIG (PRODUCTION SAFE)
================================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ingredient-health-frontend.vercel.app"
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ===============================
   MIDDLEWARE
================================= */
app.use(express.json({ limit: "25mb" }));

/* ===============================
   HEALTH CHECK ROUTE
================================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Ingredient Health API Running Successfully",
  });
});

/* ===============================
   TEST ROUTE
================================= */
app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API route working properly ✅",
  });
});

/* ===============================
   API ROUTES
================================= */
app.use("/api", analyzeRoutes);

/* ===============================
   404 HANDLER
================================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ===============================
   GLOBAL ERROR HANDLER
================================= */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* ===============================
   START SERVER (RENDER FIX)
================================= */
const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});