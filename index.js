// Importing required packages and modules
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

//importing Database and intializing
const db = require("./models");

// Creating an instance of the Express application
const app = express();

// Importing route modules
const authRoutes = require("./routes/auth/");
const projectsRoutes = require("./routes/projects/");
const servicesRoutes = require("./routes/services/");
const reviewsRoutes = require("./routes/reviews/");
const userRoutes = require("./routes/users/");
const server = http.createServer(app);

// Middleware setup
app.use(morgan("tiny")); // Logging middleware for request details
app.use(cors()); // Cross-Origin Resource Sharing for handling CORS issues

// Body parsing middleware with extended options and increased limit
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(express.json()); // JSON parsing middleware

// Syncing database models
db.sequelize.sync();

// Setting up basic route for root endpoint
app.get("/", (req, res) => {
  res.json("Algorim Server");
});

// Setting up modular routes for different features
app.use("/auth", authRoutes);
app.use("/project", projectsRoutes);
app.use("/service", servicesRoutes);
app.use("/review", reviewsRoutes);
app.use("/user", userRoutes);

// Configuring the server to listen on a specific port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
