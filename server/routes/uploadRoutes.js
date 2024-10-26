// import path from "path";
// import express from "express";
// import multer from "multer";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const extname = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${Date.now()}${extname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

//   const extname = path.extname(file.originalname).toLowerCase();
//   const mimetype = file.mimetype;

//   if (filetypes.test(extname) && mimetypes.test(mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type | Images Only!!!"), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
// });

// const uploadSingleImage = upload.single("image");

// router.post("/", (req, res) => {
//   uploadSingleImage(req, res, (err) => {
//     if (err) {
//       res.status(400).send({ message: err.message });
//     } else if (req.file) {
//       res.status(200).send({
//         message: "Image Uploaded Successfully",
//         image: `/${req.file.path}`, // Send the file path
//       });
//     } else {
//       res.status(400).send({ message: "No Image Provided" });
//     }
//   });
// });

// export default router;

import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

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
