import { getUserByEmail } from "./functions/functions.js";
import bcrypt from "bcrypt";

export const setLogin = async (req, res) => {
  const { email, password } = req.body;

  const response = await getUserByEmail(email);

  if (!response.success) {
    return res.status(404).json({
      success: false,
      message: response.message,
    });
  }

  const user = response;

  const passwordMatch = await bcrypt.compare(password, user.contraseña);
  if (!passwordMatch) {
    return res.status(401).json({
      success: false,
      message: "Password incorrect",
    });
  }

  return res.status(200).json({
    success: true,
    userId: user.id,
  });
};
