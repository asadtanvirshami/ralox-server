module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define("Reviews", {
    description: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.STRING,
    },
  });
  return Reviews;
};
