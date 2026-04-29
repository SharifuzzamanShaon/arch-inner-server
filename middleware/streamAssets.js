import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const streamAssets = (req, res) => {
  const filePath = path.join(__dirname, "../assets", req.params.filename);

  // Check file
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  const stream = fs.createReadStream(filePath);

  // Set correct Content-Type
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
  };

  res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");

  // Stream the file
  stream.pipe(res);

  //  error
  stream.on("error", () => {
    res.status(500).send("Server error while streaming file");
  });
};
