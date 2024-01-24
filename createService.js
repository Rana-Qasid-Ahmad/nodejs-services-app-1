const express = require("express");
const { client } = require("./db");
const { verifyToken } = require("./auth");

const createServiceRouter = express.Router();

createServiceRouter.post("/create", verifyToken, async (req, res) => {
  try {
    const { title, description, image, author } = req.body;
    if (!title || !description || !image || !author) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const published_at = new Date().toISOString();
    const createBlogQuery = `
      INSERT INTO blogs (title, description, image, author,published_at)
      VALUES ($1, $2, $3, $4,$5)
      RETURNING *;
    `;

    const result = await client.query(createBlogQuery, [
      title,
      description,
      image,
      author,
      published_at,
    ]);

    res.status(201).json({
      message: "Blog entry created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating blog entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = createServiceRouter;
