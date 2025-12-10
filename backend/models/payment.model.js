import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  amount: { type: Number, required: true },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending"
  },

  transactionId: String,
  paymentGateway: {
    type:String,
    default: "razorpay"
  }
}, { timestamps: true });

PaymentSchema.index({ taskId: 1, userId: 1 }, { unique: true });

export default mongoose.model("Payment", PaymentSchema);
