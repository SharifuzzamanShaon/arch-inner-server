import multer from "multer";
import upload from "../../utils/multerFileUploader.js";

export const fileUploadMiddleware = (fieldName) => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
              success: false,
              message: `${fieldName} file size should not exceed 2MB`,
            });
          }
          return res.status(400).json({
            success: false,
            message: err.message,
          });
        }
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      if (req.method === "POST" && !req.file?.filename) {
        return res.status(400).json({
          success: false,
          message: `${fieldName} is required`,
        });
      }
      next();
    });
  };
};
