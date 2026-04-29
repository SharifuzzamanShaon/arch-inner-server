import express from "express";
import {
  deleteBlog,
  getBlogByCategory,
  getBlogById,
  postBlog,
  updateBlog,
} from "../../controller/blogController/blog.controller.js";
import { createBlogSchema, updateBlogSchema } from "../../validation/Schema.js";
import { runValidation } from "../../validation/index.js";
import { fileUploadMiddleware } from "../../middleware/fileUpload/file.upload.middleware.js";
const router = express.Router();

 // IMPORTANT: put specific routes before `/:blogId`
 router.get("/blogs-by-category/:categoryId", getBlogByCategory);
 router.get("/:blogId", getBlogById);
router.post(
  "/post/:categoryId",
  postBlog
);
router.patch(
  "/update/:blogId",
  updateBlog
);
router.delete("/delete/:blogId", deleteBlog);
export default router;
