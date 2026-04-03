import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};

// Validate required environment variables
export function validateEnv() {
  if (!env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY not found in .env");
    process.exit(1);
  }

  console.log("✅ Environment variables validated");
}

export default env;