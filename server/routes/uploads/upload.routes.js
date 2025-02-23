import express from "express";
import multer from "multer";
import cloudinary from "../../config/cloudinary.js";

const router = express.Router();

// Set up multer storage (you can skip saving files locally)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No Image Provided" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader
      .upload_stream(
        {
          folder: "user_images", // Optional: Organize your images in folders
        },
        (error, result) => {
          if (error) {
            return res.status(500).send({ message: error.message });
          }

          // Return the Cloudinary URL
          res.status(200).send({
            message: "Image Uploaded Successfully",
            image: result.secure_url,
          });
        }
      )
      .end(req.file.buffer);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
