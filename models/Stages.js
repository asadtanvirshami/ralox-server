module.exports = (sequelize, DataTypes) => {
  const Stages = sequelize.define("Stages", {
    name: {
      type: DataTypes.STRING,
    },
  });
  return Stages;
};
