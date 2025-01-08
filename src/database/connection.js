import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.HOST,
  ssl: {
    rejectUnauthorized: false,
  },
  //host: "localhost",
  //port: 5432,
});

export default pool;
