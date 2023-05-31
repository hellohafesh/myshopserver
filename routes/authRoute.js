import express from "express";
import {
  registerController,
  LogInController,
  testController,
} from "../controllers/authControoler.js";
import { isAdmin, requireSignIn } from "../middlewarse/authMiddleware.js";

// router objrct

const router = express.Router();
// Register | Methode POST
router.post("/register", registerController);
// LOGIN | Methode POST
router.post("/login", LogInController);

// text route
router.get("/test", requireSignIn, isAdmin, testController);

// protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
