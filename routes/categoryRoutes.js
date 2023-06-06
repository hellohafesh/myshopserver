import express from "express";
import { isAdmin, requireSignIn } from "../middlewarse/authMiddleware";
import { createCategoryController } from "../controllers/createCategoryController";

const router = express.Router();

// Routes
router.post(
  "create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

export default router;
