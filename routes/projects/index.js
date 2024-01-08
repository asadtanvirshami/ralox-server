const routes = require("express").Router();
const projectController = require("../../controllers/projectController/index");

// Project CREATE API
routes.post("/create", projectController.createProject);

// Project GET BY STATUS API
routes.get("/getByStatus", projectController.getProjectsByStatus);

// Project GET BY USER ID API
routes.get("/getByUserId", projectController.getProjectsByUserId);

// // Project GET BY USER ID API
// routes.get("/getDetailsByUserId", projectController.getProjectsByUserId);

// Project GET BY PROJECT ID API
routes.get("/getById", projectController.getProjectById);

// Project UPDATE API
routes.put("/update", projectController.updateProject);

// Project DELETE API
routes.delete("/delete", projectController.deleteProject);

routes.get("/details",projectController.getProjectDetailByProjectId)

module.exports = routes;
