import express from "express";
import {
  adminSingIn,
  createAdmin,
} from "../controller/authController/auth.controller.js";
import { runValidation } from "../validation/index.js";
import { loginSchema } from "../validation/Schema.js";

const router = express.Router();

router.post("/create-admin", createAdmin);
router.post("/sign-in", runValidation(loginSchema), adminSingIn);

export default router;
