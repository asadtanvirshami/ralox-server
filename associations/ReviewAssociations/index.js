const { DataTypes } = require("sequelize");
const {
  Users,
  Projects,
  Reviews
} = require("../../models");

Users.hasMany(Reviews, {
  foriegnKey: {
    type: DataTypes.INTEGER,
  },
});
Reviews.belongsTo(Users);

Projects.hasMany(Reviews, {
  foriegnKey: {
    type: DataTypes.INTEGER,
  },
});
Reviews.belongsTo(Projects);

module.exports = {
  Users,
  Projects,
  Reviews
};
