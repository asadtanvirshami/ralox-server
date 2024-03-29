const Sequelize = require("sequelize");
const db = require("../../models");
const {
  Projects,
  ProjectDetails,
  ProjectServices,
} = require("../../associations/ProjectAssociations");

//-----------PROJECT CONTROLLERS-----------//

exports.createProject = async (req, res) => {
  const project_code = Math.floor(100 + Math.random() * 9000);
  console.log(req.body.data);
  try {
    const projectBody = {
      title: req.body.data.title,
      deadline: req.body.data.deadline,
      budget: req.body.data.budget,
      description: req.body.data.description,
      UserId: req.body.data.UserId,
    };

    const projectDetailBody = {
      code: project_code,
      startDate: req.body.data.startDate,
      paymentType: req.body.data.paymentType,
    };

    const createdProject = await Projects.create({
      ...projectBody,
    });
    if (createdProject) {
      const projectDetail = await ProjectDetails.create({
        ...projectDetailBody,
        ProjectId: createdProject.id,
      });
      await ProjectServices.create({
        ...req.body.data,
        ServiceId: req.body.data.service,
        ProjectDetailId: projectDetail.id,
      });
      return res.status(200).json({
        status: "success",
        message: "project-created",
        payload: createdProject,
      });
    }
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await db.Projects.findAll({
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: db.ProjectDetails,
          include: [
            { model: db.ProjectServices, include: [{ model: db.Services }] },
            { model: db.ProjectDocuments },
          ],
        },
        { model: db.Payments },
        { model: db.Milestones },
      ],
    });
    return res.status(200).json({ status: "success", projects });
  } catch (error) {
    console.error("Error fetching projects by user ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProjectsByCode = async (req, res) => {
  try {
    const codeQuery = req.query.code;
    const projects = await db.Projects.findAll({
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: db.ProjectDetails,
          where: { code: `${codeQuery}` },
          include: [
            { model: db.ProjectServices, include: [{ model: db.Services }] },
          ],
        },
        { model: db.Payments },
        { model: db.Milestones },
      ],
    });
    return res.status(200).json({ status: "success", projects });
  } catch (error) {
    console.error("Error fetching projects by user ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.update = (req, res) => {
  try {
    const updatedProjectDetail = db.ProjectDetails.upsert({
      ...req.body,
    });
    if (updatedProjectDetail) {
      return res.status(200).json({ message: "project-updated" });
    } else {
      return res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    console.error("Error deleting project:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.query.id;

    const deletedCount = await db.Projects.destroy({
      where: {
        id: projectId,
      },
    });
    const deleteProjectDetails = await db.ProjectDetails.destroy({
      where: {
        ProjectId: projectId,
      },
    });

    if (deletedCount === 1 && deleteProjectDetails === 1) {
      return res.status(200).json({ message: "project-deleted" });
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
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: db.ProjectDetails,
          include: [
            { model: db.ProjectServices, include: [{ model: db.Services }] },
          ],
        },
      ],
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

    const projects = await db.Projects.findAll({
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: db.ProjectDetails,
          where: {
            status: status,
          },
          include: [
            { model: db.ProjectServices, include: [{ model: db.Services }] },
          ],
        },
      ],
    });

    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProjectsByStatusId = async (req, res) => {
  try {
    const status = req.query.status;
    const userId = req.query.userId;

    const projects = await db.Projects.findAll({
      where: { UserId: userId },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: db.ProjectDetails,
          where: {
            status: status,
          },
          include: [
            { model: db.ProjectServices, include: [{ model: db.Services }] },
          ],
        },
      ],
    });

    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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

exports.getProjectIDs = async (req, res) => {
  try {
    const project = await db.Projects.findAll();

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
  console.log("====================================");
  console.log(req.body);
  console.log("====================================");
  try {
    const projectId = req.params.id;
    const projects = await Projects.findAll({
      where: { id: projectId },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: db.ProjectDetails,
          include: [
            { model: db.ProjectServices, include: [{ model: db.Services }] },
            { model: db.ProjectDocuments },
          ],
        },
        { model: db.Payments },
        { model: db.Milestones },
      ],
    });
    return res.status(200).json({ status: "success", projects });
  } catch (error) {
    console.error("Error fetching projects by user ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
