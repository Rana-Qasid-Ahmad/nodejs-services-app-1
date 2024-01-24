// getSingleBlog.js

const express = require("express");
const { client } = require("./db");

const getSingleServiceRouter = express.Router();

getSingleServiceRouter.get("/service/:id", async (req, res) => {
  const ServiceId = req.params.id;

  // Check if blogId is a valid integer
  if (!Number.isInteger(parseInt(ServiceId))) {
    res.status(400).json({ error: "Invalid Service Id. Must be an integer." });
    return;
  }

  try {
    const getServicesQuery = "SELECT * FROM services WHERE id = $1;";
    const result = await client.query(getServicesQuery, [ServiceId]);

    if (result.rows.length === 0) {
      // If no blog with the specified ID is found, return a 404 Not Found response
      res.status(404).json({ error: "Service not found" });
    } else {
      // If blog is found, return it in the response
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error retrieving single service entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = getSingleServiceRouter;
