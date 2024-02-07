import express from "express";
import * as userControllers from "../controllers/user.js";
import { authAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/",authAdmin, userControllers.getAllUsers);
router.post("/:login", userControllers.login);
router.post("/", userControllers.addUser);

export default router;