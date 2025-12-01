import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, // IMPORTANT for Railway
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false, // Railway FIX
  },
});

pool.getConnection((err, connection) => {
  if (err) console.error("❌ DB Connection Error:", err);
  else {
    console.log("✅ MySQL Connected Successfully");
    connection.release();
  }
});

export default pool;
