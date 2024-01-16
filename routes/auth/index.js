const routes = require('express').Router();
const authController = require("../../controllers/authController/index");

// Dashboard User Login
routes.post("/login", authController.login);

// Dashboard User Signin
routes.post("/signup", authController.signup);

// Dashboard Admin Signin
routes.post("/adminLogin", authController.adminLogin);

// Dashboard Admin Signin
routes.post("/adminSignup", authController.adminSignup);

module.exports = routes;