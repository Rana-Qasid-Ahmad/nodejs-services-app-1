const express = require("express");
const { client } = require("./db");

const getAllServiceRouter = express.Router();

getAllServiceRouter.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters, default to page 1 if not provided
    const pageSize = 10; // Number of Service per page

    const offset = (page - 1) * pageSize; // Calculate the offset for pagination

    const countQuery = "SELECT COUNT(*) FROM services;";
    const countResult = await client.query(countQuery);
    const totalCount = parseInt(countResult.rows[0].count);

    const getServicesQuery = `SELECT * FROM Services LIMIT $1 OFFSET $2;`;
    const result = await client.query(getServicesQuery, [pageSize, offset]);

    const totalPages = Math.ceil(totalCount / pageSize);
    res.status(200).json({
      result: result.rows,
      page: page,
      totalPages: totalPages,
      totalPosts: totalCount,
    });
  } catch (error) {
    console.error("Error retrieving Service entries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = getAllServiceRouter;
