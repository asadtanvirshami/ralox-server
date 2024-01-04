const routes = require('express').Router();
const authController = require("../../controllers/authController/index");

// Dashboard User Login
routes.post("/login", authController.login);

// Dashboard User Signin
routes.post("/signup", authController.signup);

module.exports = routes;