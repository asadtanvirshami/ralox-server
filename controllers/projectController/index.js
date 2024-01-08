const Sequelize = require("sequelize");
const db = require("../../models");
const { Projects } = require("../../associations/ProjectAssociations");

//-----------PROJECT CONTROLLERS-----------//

exports.createProject = async (req, res) => {
  const project_code = Math.floor(100 + Math.random() * 9000);
  try {
    const Payload = {
      ...req.body.data,
      code: project_code,
    };
    const createdProject = await Projects.create({
      ...Payload,
    });
    if (createdProject) {
      return res
        .status(200)
        .json({ status: "success", message: "project-created" });
    }
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateProject = (req, res) => {};

exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.query.id;

    const deletedCount = await db.Projects.destroy({
      where: {
        id: projectId,
      },
    });

    if (deletedCount === 1) {
      return res.status(200).json({ message: "Project deleted successfully" });
    } else {
      return res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    console.error("Error deleting project:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProjectsByUserId = async (req, res) => {

  try {
    const userId = req.query.userId;
    const projects = await db.Projects.findAll({
      where: { UserId: userId },
      order: [['createdAt', 'ASC']],
    });
    return res.status(200).json({ status: "success", projects });
  } catch (error) {
    console.error("Error fetching projects by user ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProjectsByStatus = async (req, res) => {

  try {
    const status = req.query.status;
    const userId = req.query.userId;
    const projects = await db.Projects.findAll({
      where: { status: status, UserId:userId },
      order: [['createdAt', 'ASC']],
    });

    return res.status(200).json({ status: "success", projects });
  } catch (error) {
    console.error("Error fetching projects by user ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const projectId = req.query.id;

    const project = await db.Projects.findByPk(projectId);

    if (project) {
      return res.status(200).json(project);
    } else {
      return res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//-----------PROJECT WITH PROJECT DETAILS CONTROLLERS-----------//

exports.getProjectDetailByProjectId = async (req, res) => {
  try {
    const projectId = req.query.projectId;
    const projects = await ProjectDetails.findAll({
      where: { ProjectId: projectId },
      order: [["createdAt", "ASC"]],
      include: [
        { model: ProjectServices },
        { model: Milestones },
        { model: ProjectDocuments },
      ],
    });
    return res.status(200).json({ status: "success", projects });
  } catch (error) {
    console.error("Error fetching projects by user ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
