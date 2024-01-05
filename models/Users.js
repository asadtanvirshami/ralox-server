module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    fname: {
      type: DataTypes.STRING,
    },
    lname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    country:{
      type: DataTypes.STRING,
    },
    city:{
      type: DataTypes.STRING,
    },
    long:{
      type: DataTypes.STRING,
    },
    lat:{
      type: DataTypes.STRING,
    }
  });
  return Users;
};
