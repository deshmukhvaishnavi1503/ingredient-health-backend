import express from "express";
import cors from "cors";
import analyzeRoutes from "./routes/analysisRoutes.js";

const app = express();

/* ===============================
   Middleware
================================= */

app.use(cors());
app.use(express.json({ limit: "25mb" }));

/* ===============================
   Routes
================================= */

app.use("/api", analyzeRoutes);

/* ===============================
   Health Check Route
================================= */

app.get("/", (req, res) => {
  res.status(200).send("🚀 Real-Time Ingredient Health Scoring Engine API is running");
});

/* ===============================
   Start Server (Render Compatible)
================================= */

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
