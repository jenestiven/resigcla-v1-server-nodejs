import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  database: "resigcla-v1",
  password: "Alcol1rycoz",
  host: "resigcla-v1.c0hz15humno9.us-east-1.rds.amazonaws.com",
  ssl: {
    rejectUnauthorized: false,
  },
  //host: "localhost",
  //port: 5432,
});

export default pool;
