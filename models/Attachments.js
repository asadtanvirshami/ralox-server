module.exports = (sequelize, DataTypes) => {
    const Attachments = sequelize.define("Attachments", {
      name: {
        type: DataTypes.STRING,
      },
      link: {
        type: DataTypes.STRING,
      },
    });
  
    return Attachments;
  };
  