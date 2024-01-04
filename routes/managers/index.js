const routes = require('express').Router();
const managerController = require("../../controllers/managerController/index");

// Dashboard User Login
routes.get("/create", managerController.createProject);

// Dashboard User Signin
routes.get("/get", managerController.getProject);

// Dashboard User Signin
routes.get("/update", managerController.updateProject);

// Dashboard User Signin
routes.get("/delete", managerController.deleteProject);

module.exports = routes;