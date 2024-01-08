module.exports = (sequelize, DataTypes) => {
  const Admins = sequelize.define("Admins", {
    fname: {
      type: DataTypes.STRING,
    },
    lname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  });
  return Admins;
};
