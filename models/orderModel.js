import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectID,
        ref: "Product",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectID,
      ref: "User",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shiped", "Deliverd", "Cancle"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
