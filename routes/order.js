import express from "express";
import * as orderControllar from "../controllers/order.js";
import { authAdmin, auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authAdmin, orderControllar.getAllOrders);
router.post("/", auth, orderControllar.addOrder);
router.delete("/:id", auth, orderControllar.deleteOrderById);
router.get("/:id", auth, orderControllar.getAllOrdersByUserId);
router.put("/:id", authAdmin, orderControllar.updateSetOffOrder);

export default router;