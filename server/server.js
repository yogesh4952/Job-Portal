import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import "./config/instrument.js";
import companyRoutes from "./routes/companyRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhook.js";
import { clerkMiddleware } from "@clerk/express";

//Initialize express

const app = express();

// Connect to database
try {
  await connectDB();
} catch (error) {
  console.error("❌ Failed to connect to MongoDB:", error.message);
  console.error("   Check your MONGODB_URI in .env file");
  process.exit(1);
}

try {
  await connectCloudinary();
} catch (error) {
  console.error("❌ Failed to connect to Cloudinary:", error.message);
  console.error("   Check your CLOUDINARY_* variables in .env file");
  process.exit(1);
}

// Middlewares
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(clerkMiddleware());

//Routes
app.get("/", (req, res) => {
  return res.send("API Working");
});

app.post("/webhooks", clerkWebhooks);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

if (process.env.SENTRY_DSN) {
  Sentry.setupExpressErrorHandler(app);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
