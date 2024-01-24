const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware

const { connectToDatabase, closeDatabaseConnection } = require("./db");

const createServiceRouter = require("./createService");
const getAllServiceRouter = require("./getAllServices");
const getSingleServiceRouter = require("./getSingleService");
const loginRouter = require("./LoginUser");
const jwtverify = require("./JWT");
const registrationRouter = require("./NewUser");
const searchRouter = require("./ServiceSearch");

const app = express();


app.use(cors()); // Use cors middleware
app.use(bodyParser.json());

// Connect to the database when the application starts
connectToDatabase();

app.use(createServiceRouter);
app.use(getAllServiceRouter);
app.use(getSingleServiceRouter);
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
