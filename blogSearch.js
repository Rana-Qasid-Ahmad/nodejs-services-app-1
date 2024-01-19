// search.js

const express = require("express");
const { client } = require("./db");

const searchRouter = express.Router();

// Search API route
searchRouter.get("/search", async (req, res) => {
  try {
    const query = req.query.q; // Assuming the search query is passed as a query parameter
    const itemsPerPage = parseInt(req.query.items) || 10; // Default to 10 items per page if not provided
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided

    if (!query) {
      return res.status(400).json({ error: "Missing search query parameter" });
    }

    // Count the total number of items for the search query
    const countQuery = "SELECT COUNT(*) FROM Blogs WHERE content ILIKE $1 OR title ILIKE $1";
    const totalCountResult = await client.query(countQuery, [`%${query}%`]);
    const totalCount = parseInt(totalCountResult.rows[0].count, 10);

    // Calculate OFFSET based on page and itemsPerPage
    const offset = (page - 1) * itemsPerPage;

    // Perform the paginated search based on the query parameter
    const searchQuery = "SELECT * FROM Blogs WHERE content ILIKE $1 OR title ILIKE $1 OFFSET $2 LIMIT $3";
    const result = await client.query(searchQuery, [`%${query}%`, offset, itemsPerPage]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No matching blogs found" });
    }

    const searchResults = result.rows;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    res.json({ searchResults, currentPage: page, itemsPerPage, totalPages, totalCount });
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = searchRouter;
