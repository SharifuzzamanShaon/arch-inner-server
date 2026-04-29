import express from "express";
import {
  galleryImgUploader,
  uploadContentImg,
} from "../../controller/blogContentController/contentImage.controller.js";
import { fileUploadMiddleware } from "../../middleware/fileUpload/file.upload.middleware.js";
import galleryUploadMiddleware from "../../middleware/fileUpload/gallary.upload.middleware.js";
import blogRouter from "./blog.router.js";
import blogCategoryRouter from "./blogCategory.router.js";
import ProjectRouter from "./project.router.js";
import ProjectCategoryRouter from "./projectCategory.router.js";
import serviceRouter from "./service.router.js";

const router = express.Router();
router.use("/blog-category", blogCategoryRouter);
router.use("/blog", blogRouter);

router.use("/project-category", ProjectCategoryRouter);
router.use("/project", ProjectRouter);
router.use("/service", serviceRouter);

// Blog content img
router.post(
  "/upload-content-img",
  fileUploadMiddleware("upload"),
  uploadContentImg
);
router.post(
  "/upload-gallery-img",
  galleryUploadMiddleware("gallery", 10),
  galleryImgUploader
);
export default router;
