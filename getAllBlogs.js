const express = require("express");
const { client } = require("./db");

const getAllBlogsRouter = express.Router();

getAllBlogsRouter.get("/", async (req, res) => {
  try {
    const getBlogsQuery = "SELECT * FROM blogs;";
    const result = await client.query(getBlogsQuery);

    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Error retrieving blog entries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = getAllBlogsRouter;
