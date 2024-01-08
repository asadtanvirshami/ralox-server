const { DataTypes } = require("sequelize");
const {
  Users,
  Projects,
  Services,
  ProjectServices
} = require("../../models");

ProjectServices.hasMany(Services, {
  foriegnKey: {
    type: DataTypes.INTEGER,
  },
});
Services.belongsTo(ProjectServices);

module.exports = {
  Users,
  Projects,
  Services,
  Managers,
  ProjectDetails,
  Milestones,
};
