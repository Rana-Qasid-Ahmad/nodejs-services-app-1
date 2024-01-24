const express = require("express");
const { client } = require("./db");
const { verifyToken } = require("./auth");

const jwtverify = express.Router();

jwtverify.get("/verify", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    
    const result = await client.query(
      "SELECT username, email FROM users WHERE Id = $1",
      [userId]
    );

    if (result.rows.length > 0) {
      const { username, email } = result.rows[0];

      // Send the response with username and email
      res.status(201).json({
        message: "Jwt verified successfully",
        userId: userId,
        username: username,
        email: email,
      });
    } else {
      // Handle the case where the user with the given userId is not found
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error verifying JWT:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = jwtverify;
