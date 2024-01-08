module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define("Projects", {
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },
    stage: {
      type: DataTypes.STRING,
      defaultValue: "Approval",
    },
    phase: {
      type: DataTypes.STRING,
      defaultValue: "Confirmation",
    },
    budget: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    code: {
      type: DataTypes.STRING,
    },
    manager: {
      type: DataTypes.STRING,
      defaultValue: "-",
    },
    managerNo: {
      type: DataTypes.STRING,
      defaultValue: "-",
    },
    progress: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    deadline: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.STRING,
      defaultValue: "1",
    },
    approved: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },
  });
  return Projects;
};
