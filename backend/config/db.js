import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// -----------------------------
// 1) CREATE POOL USING MYSQL_URL
// -----------------------------
// const pool = mysql.createPool({
//   uri: process.env.MYSQL_URL, // Railway provides this
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//   ssl: { rejectUnauthorized: false }, // Required for Railway SSL
// });

// -----------------------------
// CREATE POOL FOR LOCAL MYSQL
// -----------------------------
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// -----------------------------
// 2) TEST CONNECTION
// -----------------------------
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL Connection Error:", err);
  } else {
    console.log("✅ Connected to Local MySQL");
    connection.release();
  }
});

// -----------------------------
// 3) AUTO CREATE TABLES (IMPORTANT)
// -----------------------------
const createTables = () => {
  pool.query(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
    (err) => {
      if (err) console.error("❌ Error creating users table:", err);
      else console.log("✔ users table ready");
    },
  );

  pool.query(
    `
    CREATE TABLE IF NOT EXISTS projects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `,
    (err) => {
      if (err) console.error("❌ Error creating projects table:", err);
      else console.log("✔ projects table ready");
    },
  );
};

createTables();

// -----------------------------
export default pool;
