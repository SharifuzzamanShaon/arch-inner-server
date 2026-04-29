import express from "express";
import {
  allCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../controller/blogController/blogCategory.controller.js";
import { runValidation } from "../../validation/index.js";
import {
  blogCategorySchema,
  blogCategoryUpdateSchema,
} from "../../validation/Schema.js";
const router = express.Router();

router.get("/", allCategories);
router.post("/create", runValidation(blogCategorySchema), createCategory);
router.patch(
  "/update/:id",
  runValidation(blogCategoryUpdateSchema),
  updateCategory
);
router.delete("/delete/:id", deleteCategory);

export default router;
