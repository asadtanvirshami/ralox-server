const routes = require("express").Router();
const serviceController = require("../../controllers/serviceController/");

// Service CREATE API
routes.post("/create", serviceController.createServices );

// Service GET API
routes.post("/get", serviceController.getServices );


module.exports = routes;
