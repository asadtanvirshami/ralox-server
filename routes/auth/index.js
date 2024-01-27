const routes = require('express').Router();
const authController = require("../../controllers/authController/index");

//User Login
routes.post("/login", authController.login);

//User Signin
routes.post("/signup", authController.signup);

// Dashboard Admin Signin
routes.post("/adminLogin", authController.adminLogin);

// Dashboard Admin Signin
routes.post("/adminSignup", authController.adminSignup);


// SessionJWT_VERIFICATION
routes.get("/verification",  authController.verify, authController.verifyToken);

module.exports = routes;