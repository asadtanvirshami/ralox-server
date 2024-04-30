module.exports = (sequelize, DataTypes) => {
    const Appointments = sequelize.define("Appointments", {
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      time: {
        type: DataTypes.STRING,
      },
      day: {
        type: DataTypes.STRING,
      },
    });
    return Appointments;
  };
  