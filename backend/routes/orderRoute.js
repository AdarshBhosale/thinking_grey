import express from "express";
import {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus
} from "../controllers/orderController.js";
import adminAuth from "../middelware/adminAuth.js";
import authUser from "../middelware/auth.js";

const orderRouter = express.Router();

// Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment Features (COD only)
orderRouter.post("/place", authUser, placeOrder);

// User Features
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
