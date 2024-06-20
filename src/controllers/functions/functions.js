import pool from "../../database/connection.js";

export const getUserByEmail = async (email) => {
  try {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE correo_electronico = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return {
        success: false,
        message: "User not found",
      };
    } else {
      const user = result.rows[0];
      return {
        ...user,
        success: true,
      };
    }
  } catch (error) {
    console.error("Error executing query: ", error.stack);
    return {
      success: false,
      message: "Error retrieving user by email",
    };
  }
};

export const checkEmailExists = async (email) => {
  const sqlCheck =
    "SELECT COUNT(*) FROM usuarios WHERE correo_electronico = $1";
  const { rows } = await pool.query(sqlCheck, [email]);
  return rows[0].count > 0;
};

export const createUser = async (name, userType, email, password, phone) => {
  const sql =
    "INSERT INTO usuarios (nombre, tipo, correo_electronico, contraseña, celular) VALUES ($1, $2, $3, $4, $5)";
  const result = await pool.query(sql, [
    name,
    userType,
    email,
    password,
    phone,
  ]);
  return result.rowCount > 0;
};

export const handleError = (res, message, error = null) => {
  res.status(500).json({
    success: false,
    message,
    error: error ? error.message : undefined,
  });
};

export const getUserIdByEmail = async (email) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT id FROM usuarios WHERE correo_electronico = $1",
      [email]
    );
    client.release();

    if (result.rows.length === 0) {
      return { success: false, message: "User not found" };
    }
    return { success: true, userId: result.rows[0].id };
  } catch (error) {
    return {
      success: false,
      message: "Database query error",
      error: error.message,
    };
  }
};

export const insertRecyclingPoint = async (
  userId,
  address,
  imagePath,
  lat,
  lng
) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO puntosdereciclaje (id_usuario, direccion, imagen, latitud, longitud) VALUES ($1, $2, $3, $4, $5)",
      [userId, address, imagePath, lat, lng]
    );
    client.release();

    return result.rowCount > 0
      ? { success: true }
      : { success: false, message: "Error creating recycling point" };
  } catch (error) {
    return {
      success: false,
      message: "Database query error",
      error: error.message,
    };
  }
};

export const getRecyclingPointsFromDB = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM puntosdereciclaje");
    client.release();
    return { success: true, data: result.rows };
  } catch (error) {
    return {
      success: false,
      message: "Database query error",
      error: error.message,
    };
  }
};

export const updateUserProfile = async (userId, name, phone, imagePath) => {
  try {
    const client = await pool.connect();
    let query;
    let params;

    if (imagePath) {
      query =
        "UPDATE usuarios SET nombre = $1, celular = $2, foto_perfil = $3 WHERE id = $4";
      params = [name, phone, imagePath, userId];
    } else {
      query = "UPDATE usuarios SET nombre = $1, celular = $2 WHERE id = $3";
      params = [name, phone, userId];
    }

    const result = await client.query(query, params);
    client.release();
    return result.rowCount > 0
      ? { success: true }
      : { success: false, message: "Error updating user information" };
  } catch (error) {
    return {
      success: false,
      message: "Database query error",
      error: error.message,
    };
  }
};

export const getUserById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return {
        success: false,
        message: "User not found",
      };
    } else {
      const user = result.rows[0];
      return {
        ...user,
        success: true,
      };
    }
  } catch (error) {
    console.error("Error executing query: ", error.stack);
    return {
      success: false,
      message: "Error retrieving user by ID",
    };
  }
};
