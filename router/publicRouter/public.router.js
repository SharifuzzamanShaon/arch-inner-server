import express from "express";
import {
  getAllBlogs,
  getBlogByCategory,
  getBlogByTitleSlug,
} from "../../controller/blogController/blog.controller.js";
import { allCategories } from "../../controller/blogController/blogCategory.controller.js";
import {
  getAllProjects,
  getAllProjectsByCategory,
  getProjectById,
} from "../../controller/projectController/project.controller.js";
import { getAllProjectCategories } from "../../controller/projectController/projectCategory.contoller.js";
import { getGalleryImgs } from "../../controller/publicRouteController/galleryImgController.js";
import { getService } from "../../controller/serviceController/service.controller.js";
const router = express.Router();
router.get("/blog-category", allCategories);
router.get("/blogs", getAllBlogs);
router.get("/blogs-by-category/:categoryId", getBlogByCategory);
router.get("/blog/:urlSlug", getBlogByTitleSlug);

router.get("/project-category", getAllProjectCategories);
router.get("/projects", getAllProjects);
router.get("/project-by-category/:categoryId", getAllProjectsByCategory);
router.get("/project/:ProjectId", getProjectById);

router.get("/services", getService);

router.get("/gallery-images", getGalleryImgs);

export default router;
