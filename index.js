const express = require("express");
const bodyParser = require("body-parser");
const { connectToDatabase, closeDatabaseConnection } = require("./db");

const createBlogRouter = require("./createBlog");
const getAllBlogsRouter = require("./getAllBlogs");
const getSingleBlogRouter = require("./getSingleBlog");
const loginRouter = require("./login");
const jwtverify = require("./jwttoken");
const registrationRouter = require("./register");
const searchRouter = require("./blogSearch");

const app = express();

app.use(bodyParser.json());

// Connect to the database when the application starts
connectToDatabase();

app.use(createBlogRouter);
app.use(getAllBlogsRouter);
app.use(getSingleBlogRouter);
app.use(loginRouter);
app.use(jwtverify);
app.use(registrationRouter);
app.use(searchRouter);

app.get('/favicon.ico', (req, res) => {
  // Respond with a 404 status code
  res.status(200).end();
});

// Close the database connection when the application exits
process.on("exit", () => {
  closeDatabaseConnection();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
