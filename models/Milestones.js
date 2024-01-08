module.exports = (sequelize, DataTypes) => {
    const Milestones = sequelize.define("Milestones", {
      name: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
      },
      amount: {
        type: DataTypes.FLOAT,
      },
    });
    return Milestones;
  };