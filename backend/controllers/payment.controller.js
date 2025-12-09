import { razorpayInstance } from "../config/razorpay.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpayInstance.orders.create(options);
    return res.json(order);

  } catch (err) {
    console.error("Order creation error:", err);
    return res.status(500).json({ message: "Order creation failed" });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const signString = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(signString)
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      return res.json({ success: true });
    }

    return res.json({ success: false });

  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({ message: "Payment verification failed" });
  }
};
