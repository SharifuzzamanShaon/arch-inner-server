import express from "express";
import { authorize } from "../middleware/authorize.middleware.js";
import adminRouter from "./admin/admin.router.js";
import authRouter from "./auth.router.js";
import publicRouter from "./publicRouter/public.router.js";
const router = express.Router();

router.use("/auth-admin", authRouter);
router.use("/admin", authorize, adminRouter);

router.use("/public", publicRouter);

export default router;
