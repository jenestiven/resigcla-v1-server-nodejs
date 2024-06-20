import { getUserById } from "./functions/functions.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getUserDetails = async (req, res) => {
  const { userId } = req.params;

  const response = await getUserById(userId);

  if (!response.success) {
    return res.status(404).json({
      success: false,
      message: response.message,
    });
  }

  const user = response;
  let base64Image = null;

  if (user.foto_perfil) {
    const absolutePath = path.resolve(__dirname, user.foto_perfil);
    const exist = fs.existsSync(absolutePath);

    if (exist) {
      const imageData = fs.readFileSync(absolutePath);
      base64Image = `data:image/${path
        .extname(user.foto_perfil)
        .slice(1)};base64,${imageData.toString("base64")}`;
    } else {
      console.log(`Image not found at path: ${absolutePath}`);
    }
  }

  return res.json({
    success: true,
    name: user.nombre,
    email: user.correo_electronico,
    userType: user.tipo,
    thumbnail: base64Image, // enviara null si no existe
    phone: user.celular,
    stars: user.calificacion,
  });
};
