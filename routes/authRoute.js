import express from "express";
import {
  registerController,
  LogInController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authControoler.js";
import { isAdmin, requireSignIn } from "../middlewarse/authMiddleware.js";

// router objrct

const router = express.Router();
// Register | Methode POST
router.post("/register", registerController);
// LOGIN | Methode POST
router.post("/login", LogInController);
// Forgot Password | Methode POST
router.post("/forgot-password", forgotPasswordController);

// text route
router.get("/test", requireSignIn, isAdmin, testController);

// protected route user
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
// protected route admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile", requireSignIn, updateProfileController);

// orders
router.get("/orders", requireSignIn, getOdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
