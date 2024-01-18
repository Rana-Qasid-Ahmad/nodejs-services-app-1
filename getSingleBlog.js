// getSingleBlog.js

const express = require("express");
const { client } = require("./db");

const getSingleBlogRouter = express.Router();

getSingleBlogRouter.get("/:id", async (req, res) => {
  const blogId = req.params.id;

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

module.exports = getSingleBlogRouter;
