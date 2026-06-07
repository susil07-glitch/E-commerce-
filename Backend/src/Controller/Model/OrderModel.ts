import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    Userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        quantity: {
          type: Number,
          required: true,
        },
        ProductDetails: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    ShippingAddress: {
      type: String,
      required: true,
    },
    OrderStuatus: {
      type: String,
      enum: ["pending", "Shipped", "Delivered", "cancelled"],
      default: "pending",
    },
    PaymentDetails: {
      method: {
        type: String,
        enum: ["Cash on Delivery", "Credit Card", "Debit Card "],
      },
      Status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
      },
    },
  },
  { timestamps: true },
);

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
