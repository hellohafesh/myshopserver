import express from "express";
import { isAdmin, requireSignIn } from "../middlewarse/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/createCategoryController.js";

const router = express.Router();

// Routes  create-category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// Routes Update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);
// Router get all
router.get("/get-category", categoryController);

// Router get all
router.get("/single-category/:slug", singleCategoryController);

// Routes Delets category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
