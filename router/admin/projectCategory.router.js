import express from "express";
import {
  createProjectCategory,
  deleteProjectCategory,
  getAllProjectCategories,
  updateProjectCategory,
} from "../../controller/projectController/ProjectCategory.contoller.js";
import { runValidation } from "../../validation/index.js";
import {
  blogCategorySchema,
  blogCategoryUpdateSchema,
} from "../../validation/Schema.js";

const router = express.Router();

router.get("/", getAllProjectCategories);
router.post(
  "/create",
  runValidation(blogCategorySchema),
  createProjectCategory
);
router.patch(
  "/update/:categoryId",
  runValidation(blogCategoryUpdateSchema),
  updateProjectCategory
);
router.delete("/delete/:categoryId", deleteProjectCategory);

export default router;
