import express from "express";
import { isAdmin, requireSignIn } from "../middlewarse/authMiddleware.js";
import { createProductController } from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// Routes  create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// Routes Update category
// router.put(
//   "/update-category/:id",
//   requireSignIn,
//   isAdmin,
//   updateCategoryController
// );
// Router get all
// router.get("/get-category", categoryController);

// Router get all
// router.get("/single-category/:slug", singleCategoryController);

// Routes Delets category
// router.delete(
//   "/delete-category/:id",
//   requireSignIn,
//   isAdmin,
//   deleteCategoryController
// );

export default router;
