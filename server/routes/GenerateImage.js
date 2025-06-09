import express from "express";
import { generateAIImage } from "../controllers/GenerateImage.js";

const router = express.Router();

router.route("/").post(generateAIImage);

export default router;
