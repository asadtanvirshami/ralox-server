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
      },
      stage:{
        type: DataTypes.STRING,
      },
      code:{
        type: DataTypes.STRING,
      },
      manager:{
        type: DataTypes.STRING,
      },
      manager_no:{
        type: DataTypes.STRING,
      },
      progress:{
        type: DataTypes.STRING,
      },
      start_date:{
        type: DataTypes.DATE,
      },
      end_date:{
        type: DataTypes.DATE,
      },
      deadline: {
        type: DataTypes.DATE,
      },
    });
    return Projects;
  };
  