const routes = require("express").Router();
const projectController = require("../../controllers/projectController/index");

// Project GET API
routes.get("/getAllProjects", projectController.getAllProjects);

// Project CREATE API
routes.post("/create", projectController.createProject);

// Project Search API
routes.get("/getByCode", projectController.getProjectsByCode);

// Project UPDATE API
routes.post("/update", projectController.update);

// Project GET BY STATUS API
routes.get("/getByStatus", projectController.getProjectsByStatus);

// Project GET BY USER ID API
routes.get("/getByUserId", projectController.getProjectsByUserId);

// Project GET BY PROJECT ID API
routes.get("/getById", projectController.getProjectById);

// Project DELETE API
routes.delete("/delete", projectController.deleteProject);

// ProjectDetails by ID GET API
routes.get("/details/:id",projectController.getProjectDetailByProjectId)

// ProjectDetails by ID GET API
routes.get("/ids",projectController.getProjectIDs)

module.exports = routes;




// // Project GET BY USER ID API
// routes.get("/getDetailsByUserId", projectController.getProjectsByUserId);
