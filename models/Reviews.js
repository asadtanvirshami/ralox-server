module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define("Reviews", {
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.STRING,
    },
  });
  return Reviews;
};
