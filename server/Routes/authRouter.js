import { Router } from "express";
import { googleLogin } from "../Controller/User/authController.js";

const router = Router();


router.get("/google", googleLogin)

export default router;