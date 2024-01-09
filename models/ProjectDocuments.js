module.exports = (sequelize, DataTypes) => {
    const ProjectDocuments = sequelize.define("ProjectDocuments", {
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      dateCreated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      files: {
        type: DataTypes.JSON,
      },
      
    });
  
    return ProjectDocuments;
  };