import express from "express";
import Subscriber from "../models/subscriberModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required." });
  }

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "You’ve already subscribed." });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res
      .status(201)
      .json({ success: true, message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Subscription Error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

export default router;
