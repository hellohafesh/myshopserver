import express from "express";
import { isAdmin, requireSignIn } from "../middlewarse/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getFilterProductController,
  getProductController,
  getProductCountController,
  getProductListController,
  getProductPhotoController,
  getSingleProductController,
  productCategoryController,
  reletedProductController,
  searchProductController,
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

// filter product
router.post("/product-filters", getFilterProductController);

// product count
router.get("/product-count", getProductCountController);

// product per page
router.get("/product-list/:page/:perPage", getProductListController);

// product search
router.get("/search/:keyword", searchProductController);

// product similar
router.get("/releted-product/:pid/:cid", reletedProductController);

// category product
router.get("/product-category/:slug", productCategoryController);

// payments route
// token
router.get("/braintree/token", braintreeTokenController);

// payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
