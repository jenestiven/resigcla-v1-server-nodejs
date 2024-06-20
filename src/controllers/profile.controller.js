import fs from "fs";
import path from "path";
import upload from "./functions/uploadConfig.js";
import { getUserIdByEmail, updateUserProfile } from "./functions/functions.js";

export const updateProfile = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error uploading image",
        error: err.message,
      });
    }

    const { emisor, name, phone } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const userResponse = await getUserIdByEmail(emisor);
    if (!userResponse.success) {
      return res.status(404).json({
        success: false,
        message: userResponse.message,
      });
    }

    const updateResponse = await updateUserProfile(
      userResponse.userId,
      name,
      phone,
      imagePath
    );
    if (!updateResponse.success) {
      return res.status(500).json({
        success: false,
        message: updateResponse.message,
      });
    }

    if (imagePath) {
      const imageData = fs.readFileSync(imagePath);
      const mimeType = path.extname(imagePath).slice(1);

      res.set("Content-Type", `image/${mimeType}`);
      res.send(imageData);
    } else {
      res.status(200).json({
        success: true,
        message: "Profile updated successfully without image",
      });
    }
  });
};
