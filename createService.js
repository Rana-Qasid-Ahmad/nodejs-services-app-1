const express = require("express");
const { client } = require("./db");
const { verifyToken } = require("./auth");

const createServiceRouter = express.Router();

createServiceRouter.post("/create", verifyToken, async (req, res) => {
  try {
    const { title, description, image_link} = req.body;
    if (!title || !description || !image_link) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const createServicesQuery = `
      INSERT INTO services (title, description, Image_link)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const result = await client.query(createServicesQuery, [
      title,
      description,
      image_link
    ]);

    res.status(201).json({
      message: "Service entry created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating Service entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = createServiceRouter;
