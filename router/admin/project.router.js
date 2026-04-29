import express from "express";
const router = express.Router();

import {
  createProject,
  deleteProject,
  getAllProjectsByCategory,
  getProjectById,
  updateProject,
} from "../../controller/projectController/project.controller.js";
import { ProjectSchema } from "../../validation/Schema.js";

router.get(
  "/porjcet-by-category/:categoryId",
  getAllProjectsByCategory
);
router.get("/:projectId", getProjectById);
router.post(
  "/post/:categoryId",
  createProject
);
router.patch("/update/:projectId", updateProject);
router.delete("/delete/:projectId", deleteProject);
export default router;
