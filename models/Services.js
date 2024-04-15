module.exports = (sequelize, DataTypes) => {
  const Services = sequelize.define("Services", {
    name: {
      type: DataTypes.STRING,
    },
  });
  return Services;
};
