// upload gallery image

import multer from "multer";
import upload from "../../utils/multerFileUploader.js";

export const galleryUploadMiddleware = (fieldName, maxCount = 10) => {
  return (req, res, next) => {
    upload.array(fieldName, maxCount)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
              success: false,
              message: `Each file size should not exceed 2MB`,
            });
          }
          if (err.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({
              success: false,
              message: `Maximum ${maxCount} files are allowed`,
            });
          }
          return res.status(400).json({
            success: false,
            message: `File upload error: ${err.message}`,
          });
        }
        return res.status(400).json({
          success: false,
          message: err.message || "Error uploading files",
        });
      }

      // Check if files were uploaded for POST requests
      if (req.method === "POST" && (!req.files || req.files.length === 0)) {
        return res.status(400).json({
          success: false,
          message: `At least one ${fieldName} file is required`,
        });
      }
      next();
    });
  };
};

export default galleryUploadMiddleware;
