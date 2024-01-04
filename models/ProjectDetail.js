module.exports = (sequelize, DataTypes) => {
    const ProjectDetails = sequelize.define("ProjectDetails", {
      amount: {
        type: DataTypes.STRING,
      },
      boost_price:{
        type: DataTypes.STRING,
      }
    });
    return ProjectDetails;
  };
  