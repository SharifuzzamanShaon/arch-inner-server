import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import router from "./router/index.js";
import { handlePrismaError } from "./utils/prismaErrorHandler.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Refresh-Token"],
  })
);
// Serve static files
// file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Stream File
// app.get("/assets/:filename", streamAssets);

app.get("/", (req, res) => {
  res.send("Hello from Arch Inner!");
});

// Router
app.use("/api/v1", router);

// Error handling middleware
app.use((err, req, res, next) => {
  let statusCode = err.status || 500;
  let message = err.message || "Internal Server Error";
  const prismaError = handlePrismaError(err);
  if (prismaError) {
    statusCode = prismaError.status;
    message = prismaError.message;
  }
  res.status(statusCode).json({
    success: false,
    message,
  });
});

// global 404 handler | invalid endpoint
app.use((req, res, next) => {
  return res.status(404).json({
    success: false,
    message: `Endpoint "-${req.originalUrl}-" does not exist`,
  });
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
