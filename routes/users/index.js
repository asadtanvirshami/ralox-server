const routes = require("express").Router();
const userController = require("../../controllers/userController/");

// Service CREATE API
routes.post("/edit", userController.edit );

// Service GET API
routes.get("/get", userController.get );


module.exports = routes;
