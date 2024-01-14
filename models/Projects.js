module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define("Projects", {
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    budget: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    deadline: {
      type: DataTypes.STRING,
    },
  });
  return Projects;
};
