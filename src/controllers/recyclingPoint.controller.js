import pool from "../database/connection.js";
import {
  getRecyclingPointsFromDB,
  getUserIdByEmail,
  handleError,
  insertRecyclingPoint,
} from "./functions/functions.js";
import upload, { convertImageToBase64 } from "./functions/uploadConfig.js";
import path from "path";

export const createRecyclingPoint = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error uploading image",
        error: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const { emisor, lat, lng, address } = req.body;
    const relativeImagePath = path.posix.join("..", "files", req.file.filename);

    const userResponse = await getUserIdByEmail(emisor);
    if (!userResponse.success) {
      return res.status(404).json({
        success: false,
        message: userResponse.message,
      });
    }

    const insertResponse = await insertRecyclingPoint(
      userResponse.userId,
      address,
      relativeImagePath,
      lat,
      lng
    );

    if (!insertResponse.success) {
      return res.status(500).json({
        success: false,
        message: insertResponse.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Recycling point created successfully",
    });
  });
};

export const getAllRecyclingCenters = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM bodegasdereciclaje");
    const data = response.rows.map((row) => {
      return row;
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    handleError(res, "Error in the request", error);
  }
};

export const getAllRecyclingPoints = async (req, res) => {
  const dbResponse = await getRecyclingPointsFromDB();

  if (!dbResponse.success) {
    return res.status(500).json({
      success: false,
      message: dbResponse.message,
      error: dbResponse.error,
    });
  }

  const data = dbResponse.data.map((row) => {
    row.imagen = row.imagen ? convertImageToBase64(row.imagen) : null;
    return row;
  });

  return res.status(200).json({
    success: true,
    data,
  });
};
