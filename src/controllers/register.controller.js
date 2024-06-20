import {
  checkEmailExists,
  createUser,
  handleError,
} from "./functions/functions.js";
import bcrypt from "bcrypt";

export const setRegister = async (req, res) => {
  try {
    const userData = req.body;
    const { name, email, password, phone, userType } = userData;
    console.log("userData: ", userData);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hased: ", hashedPassword);

    if (await checkEmailExists(email)) {
      res.status(409).json({
        success: false,
        message: "The email is already registered",
        code: 409,
      });
    } else {
      const userCreated = await createUser(
        name,
        userType,
        email,
        hashedPassword,
        phone
      );

      if (userCreated) {
        res.status(201).json({
          success: true,
          message: "User created successfully",
          data: userData,
        });
      } else {
        handleError(res, "Error creating user");
      }
    }
  } catch (error) {
    handleError(res, "Error in the request", error);
  }
};
