import express from "express";
import { isAdmin, requireSignIn } from "../middlewarse/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getProductPhotoController,
  getSingleProductController,
  updateProductController,
} from "../controllers/productController.js";
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
// Routes  Updatw product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get product
router.get("/get-product", getProductController);

// get product single
router.get("/get-product/:slug", getSingleProductController);

// get product photo
router.get("/product-photo/:pid", getProductPhotoController);

// get delete product
router.delete("/delete-product/:pid", deleteProductController);

export default router;
