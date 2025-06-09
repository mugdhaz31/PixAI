import axios from "axios";
import * as dotenv from "dotenv";
import FormData from "form-data";
import { createError } from "../error.js";

dotenv.config();

export const generateAIImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    // Build form data manually
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("output_format", "png"); // or "jpeg"

    const response = await axios.post(
      "https://api.stability.ai/v2beta/stable-image/generate/sd3",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: "image/*",
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer", // to get raw image data
        validateStatus: undefined,
      }
    );

    if (response.status === 200) {
      const imageBase64 = Buffer.from(response.data).toString("base64");
      res.status(200).json({ photo: imageBase64 });
    } else {
      console.error("Error generating image:", response.status, response.data.toString());
      return next(createError(response.status, "Failed to generate image using Stability AI"));
    }
  } catch (error) {
    console.error("Error generating image:", error.response?.data || error.message);
    next(createError(500, "Failed to generate image using Stability AI"));
  }
};
