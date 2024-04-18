const routes = require("express").Router();
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
routes.get("/verification", authController.verify, authController.verifyToken);

routes.get(
  "/linkVerification",
  authController.verify,
  authController.verifyResetLinkToken
);

// Reset-Link Generation
routes.post("/generateResetLink", authController.generateResetLink);

routes.post("/resetPassword", authController.resetPassword);

module.exports = routes;
