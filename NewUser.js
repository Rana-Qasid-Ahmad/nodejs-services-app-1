const express = require("express");
const bcrypt = require("bcrypt");
const { client } = require("./db");
const { generateToken } = require("./auth");

const registrationRouter = express.Router();

registrationRouter.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if the username already exists
    const userExistsQuery = "SELECT * FROM users_services WHERE name = $1";
    const userExistsResult = await client.query(userExistsQuery, [username]);

    if (userExistsResult.rows.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const insertUserQuery = "INSERT INTO users_services (name, password, email) VALUES ($1, $2 , $3) RETURNING id, name, email";
    const result = await client.query(insertUserQuery, [username, hashedPassword, email]);

    const userId = result.rows[0].id;
    // const userEmail = result.rows[0].email;

    // Generate a JWT token
    const token = generateToken(userId);

    // Respond with the token and user details
    res.status(201).json({ token, user: { id: userId, username } });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = registrationRouter;
