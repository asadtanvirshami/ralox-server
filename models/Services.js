module.exports = (sequelize, DataTypes) => {
  const Services = sequelize.define("Services", {
    name: {
      type: DataTypes.STRING,
    },
    boostPrice: {
      type: DataTypes.FLOAT,
    },
  });
  return Services;
};
