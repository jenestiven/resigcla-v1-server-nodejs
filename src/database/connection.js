import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  database: "resigcla",
  password: "Alcol1rycoz",
  host: "localhost",
  port: 5432,
});

export default pool;
