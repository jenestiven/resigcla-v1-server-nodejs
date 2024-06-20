import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../../files");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    const newFileName = `${file.fieldname}-${uniqueSuffix}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage });

export const convertImageToBase64 = (relativeImagePath) => {
  try {
    const absolutePath = path.resolve(__dirname, "../", relativeImagePath);
    if (fs.existsSync(absolutePath)) {
      const imageData = fs.readFileSync(absolutePath);
      return `data:image/${path
        .extname(absolutePath)
        .slice(1)};base64,${imageData.toString("base64")}`;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error converting image to base64:", error.message);
    return null;
  }
};

export default upload;
