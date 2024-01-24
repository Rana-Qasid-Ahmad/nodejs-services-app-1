// getSingleBlog.js

const express = require("express");
const { client } = require("./db");

const getSingleServiceRouter = express.Router();

getSingleServiceRouter.get("/blog/:id", async (req, res) => {
  const blogId = req.params.id;

  // Check if blogId is a valid integer
  if (!Number.isInteger(parseInt(blogId))) {
    res.status(400).json({ error: "Invalid blog ID. Must be an integer." });
    return;
  }

  try {
    const getBlogQuery = "SELECT * FROM blogs WHERE id = $1;";
    const result = await client.query(getBlogQuery, [blogId]);

    if (result.rows.length === 0) {
      // If no blog with the specified ID is found, return a 404 Not Found response
      res.status(404).json({ error: "Blog not found" });
    } else {
      // If blog is found, return it in the response
      res.status(200).json({ data: result.rows[0] });
    }
  } catch (error) {
    console.error("Error retrieving single blog entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = getSingleServiceRouter;
