const Sequelize = require("sequelize");
const nodemailer = require("nodemailer");
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
      if (
        Array.isArray(req.body.data.service) &&
        req.body.data.service.length > 0
      ) {
        await req.body.data.service.forEach(async (x) => {
          // Make sure to use async function to await inside forEach
          const serviceIds = x.split(",").map((id) => id.trim()); // Split and parse the string
          for (const serviceId of serviceIds) {
            await ProjectServices.create({
              ProjectDetailId: projectDetail.id,
              ServiceId: serviceId,
            });
          }
        });
      }

      let transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        // host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
          user: "raloxsoft@gmail.com",
          pass: "1YA8BmcNtsO2fbXa",
        },
      });
      await transporter.sendMail({
        from: `"Algorim Team" <algorimsoftware@outlook.com>`,
        to: `${req.body.data.email}`,
        subject: `Confirmation: Receipt of Your Project Submission`,
        html: `<p>Dear Esteemed Customer,</p>
          <p>We are pleased to inform you that we have received your project submission successfully. Your project has been assigned the code <strong>${project_code}</strong>. Our dedicated team will meticulously review the provided details.</p>
          <p>Below is a summary of the project details:</p>
          <table style="border-collapse: collapse; width: 100%;">
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px;">Title</th>
              <td style="border: 1px solid #ddd; padding: 8px;">${projectBody.title}</td>
            </tr>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px;">Deadline</th>
              <td style="border: 1px solid #ddd; padding: 8px;">${projectBody.deadline}</td>
            </tr>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px;">Budget</th>
              <td style="border: 1px solid #ddd; padding: 8px;">${projectBody.budget}</td>
            </tr>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px;">Description</th>
              <td style="border: 1px solid #ddd; padding: 8px;">${projectBody.description}</td>
            </tr>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px;">code</th>
              <td style="border: 1px solid #ddd; padding: 8px;">${project_code}</td>
            </tr>
          </table>
          <p>Rest assured, we will keep you updated on the progress of the review process. Your satisfaction is our utmost priority.</p>
          <p>Thank you for selecting Algorim. We eagerly anticipate the opportunity to collaborate with you!</p>
          <p>Best Regards,</p>
          <p>The Algorim Team</p>`,
      });

      // console.log("Message sent: %s", info.messageId);
      // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
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
            // { model: db.ProjectDocuments },
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

// exports.getProjectsByUserId = async (req, res) => {
//   try {
//     const { page, pageSize } = req.query;
//     const offset = (page - 1) * pageSize;

//     const totalCount = await db.Projects.count();

//     const projects = await db.Projects.findAll({
//       order: [["createdAt", "ASC"]],
//       include: [
//         {
//           model: db.ProjectDetails,
//           include: [
//             { model: db.ProjectServices, include: [{ model: db.Services }] },
//           ],
//         },
//         { model: db.Payments },
//         { model: db.Milestones },
//       ],
//       offset,
//       limit: pageSize,
//     });

//     return res.status(200).json({
//       status: "success",
//       projects,
//       currentPage: parseInt(page),
//       pageSize: parseInt(pageSize),
//       totalCount,
//     });
//   } catch (error) {
//     console.error("Error fetching projects:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

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

exports.getProjectsByUserId = async (req, res) => {
  try {
    const status = req.query.status || "";
    const userId = req.query.userId;
    const page = parseInt(req.query.page) || 0; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 items per page if not provided

    const zeroBasedPage = Math.max(0, page - 1);
    const offset = zeroBasedPage * pageSize;

    let totalCount;
    let projects;

    if (status !== "") {
      // If status is provided, filter projects based on status
      totalCount = await db.Projects.count({
        where: { UserId: userId },
        include: [
          {
            model: db.ProjectDetails,
            where: { status: status },
          },
        ],
      });

      projects = await db.Projects.findAll({
        where: { UserId: userId },
        order: [["createdAt", "ASC"]],
        include: [
          {
            model: db.ProjectDetails,
            where: { status: status },
            include: [{ model: db.ProjectServices, include: [db.Services] }],
          },
        ],
        offset,
        limit: pageSize,
      });
    } else {
      // If status is not provided, fetch all projects
      totalCount = await db.Projects.count({ where: { UserId: userId } });

      projects = await db.Projects.findAll({
        where: { UserId: userId },
        order: [["createdAt", "ASC"]],
        include: [
          {
            model: db.ProjectDetails,
            include: [{ model: db.ProjectServices, include: [db.Services] }],
          },
        ],
        offset,
        limit: pageSize,
      });
    }

    return res.status(200).json({
      status: "success",
      projects,
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      totalCount,
    });
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

//-----------PROJECT WITH PROJECT DETAILS CONTROLLERS-----------///

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
            // { model: db.ProjectDocuments },
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
