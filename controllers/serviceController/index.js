const Sequelize = require("sequelize");
const db = require("../../models");
const { Services } = require("../../associations/ProjectAssociations");

exports.createServices = async (req, res) => {
  try {
    const Payload = {
      ...req.body,
    };
    const createService = await Services.create({
      ...Payload,
    });
    if (createService) {
      return res
        .status(200)
        .json({ status: "success", message: "service-created" });
    }
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateServices = (req, res) => {};

exports.deleteServices = (req, res) => {};

exports.getServices = async (req, res) => {
  try {
    const service = await db.Services.findAll();
    return res.status(200).json({ status: "success", payload:service });
  } catch (error) {
    console.error("Error fetching projects by user ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
