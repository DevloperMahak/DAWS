import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

// REGISTER USER
export const registerUser = (req, res) => {
  console.log("🔥 Register endpoint HIT");

  const { name, email, password } = req.body;

  // Check empty
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if email exists
  db.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (result.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashed = bcrypt.hashSync(password, 10);

    // Insert user
    db.query(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashed],
      (err, result) => {
        console.log("MySQL Error:", err); // <-- ADD THIS
        if (err) return res.status(500).json({ message: "DB error" });

        return res.json({ message: "User registered successfully" });
      }
    );
  });
};

// LOGIN USER
export const loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (result.length === 0)
      return res.status(400).json({ message: "Invalid email or password" });

    const user = result[0];

    // Compare password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );

    res.json({
      message: "Login success",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
};
