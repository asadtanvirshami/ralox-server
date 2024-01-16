module.exports = (sequelize, DataTypes) => {
    const ProjectDetails = sequelize.define("ProjectDetails", {
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      boosted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      paymentType: {
        type: DataTypes.STRING,
      },
      startDate: {
        type: DataTypes.STRING,
      },
      endDate: {
        type: DataTypes.STRING,
        defaultValue: "Not-ended",
      },
      manager: {
        type: DataTypes.STRING,
        defaultValue: "No-manager",
      },
      managerNo: {
        type: DataTypes.STRING,
        defaultValue: "No-number",
      },
      progress: {
        type: DataTypes.STRING,
        defaultValue: "0",
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
      code: {
        type: DataTypes.STRING,
      },
    });
    return ProjectDetails;
  };
  