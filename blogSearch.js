// search.js

const express = require("express");
const { client } = require("./db");

const searchRouter = express.Router();

// Search API route
searchRouter.get("/search", async (req, res) => {
  try {
    const query = req.query.q; // Assuming the search query is passed as a query parameter

    if (!query) {
      return res.status(400).json({ error: "Missing search query parameter" });
    }

    // Perform the search based on the query parameter
    const searchQuery = "SELECT * FROM Blogs WHERE content ILIKE $1 OR title ILIKE $1";
    const result = await client.query(searchQuery, [`%${query}%`]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No matching blogs found" });
    }

    const searchResults = result.rows;
    res.json({ searchResults });
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = searchRouter;
