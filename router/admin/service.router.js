import express from "express";
import { createService, getService, getServiceById, updateService, deleteService } from "../../controller/serviceController/service.controller.js";
const router = express.Router();

router.post("/create", createService);
router.get("/", getService);
router.get("/:serviceId", getServiceById);
router.patch("/update/:serviceId", updateService);
router.delete("/delete/:serviceId", deleteService);

export default router;