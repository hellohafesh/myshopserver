import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoute.js";
import cors from "cors";

// configure enc pakage
dotenv.config();
// connect db
connectDB();
// ???REST OBJECT
const app = express();
// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);

// rest API
app.get("/", (req, res) => {
  res.send({
    message: "Wellcome to e com app",
  });
});

// port
const PORT = process.env.PORT || 7000;
//  run listen
app.listen(PORT, () => {
  console.log(`Server Run on ${PORT}`.bgCyan.white);
});
