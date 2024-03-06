import express from "express";
import * as productControllar from "../controllers/product.js";
import { authAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", productControllar.getAllProduct);
router.get("/:id", productControllar.getProductById);
router.get("/num/pages", productControllar.getNumOfPages);
router.post("/", authAdmin, productControllar.addProduct);
router.delete("/:id", authAdmin, productControllar.deleteProductById);
router.put("/:id", authAdmin, productControllar.updateProductById);

export default router;