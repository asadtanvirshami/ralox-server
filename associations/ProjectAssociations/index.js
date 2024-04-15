const { DataTypes } = require("sequelize");
const {
  Users,
  Projects,
  Services,
  Managers,
  ProjectDetails,
  Milestones,
  Attachments,
  Payments,
  // ProjectDocuments,
  ProjectServices,
} = require("../../models");

//-----------PROJECT ASSOCIATIONS-----------//

//Users <---> Projects
Users.hasMany(Projects, {
  foriegnKey: {
    type: DataTypes.INTEGER,
  },
});
Projects.belongsTo(Users);

//Projects <---> ProjectDetails
Projects.hasOne(ProjectDetails, {
  foriegnKey: {
    type: DataTypes.INTEGER,
  },
});
ProjectDetails.belongsTo(Projects);

//Projects <---> Milestones
Projects.hasMany(Milestones, {
  foriegnKey: {
    type: DataTypes.INTEGER,
  },
});
Milestones.belongsTo(Projects);

//Managers <---> Projects
Managers.hasMany(Projects, {
  foriegnKey: {
    type: DataTypes.INTEGER,
  },
});
Projects.belongsTo(Managers);

//-----------PROJECT DETAILS ASSOCIATIONS-----------//

//Project <---> Milestones
Projects.hasMany(Milestones, {
  foriegnKey: {
    type: DataTypes.INTEGER,
  },
});
Milestones.belongsTo(Projects);

//Services <---> Project Details
Services.hasMany(ProjectServices, {
  foriegnKey: {
    type: DataTypes.INTEGER,
  },
});
ProjectServices.belongsTo(Services);

//Payments <---> Milestones
Payments.hasMany(Milestones, {
  foriegnKey: {
    type: DataTypes.INTEGER,
  },
});
Milestones.belongsTo(Payments);

//Payments <---> Projects
Projects.hasMany(Payments, {
  foriegnKey: {
    type: DataTypes.INTEGER,
  },
});
Payments.belongsTo(Projects);

//Milestones <---> Projects
Projects.hasMany(Milestones, {
  foriegnKey: {
    type: DataTypes.INTEGER,
  },
});
Milestones.belongsTo(Projects);

//ProjectDetails <---> ProjectDocuments
// ProjectDetails.hasMany(ProjectDocuments, {
//   foriegnKey: {
//     type: DataTypes.INTEGER,
//   },
// });
// ProjectDocuments.belongsTo(ProjectDetails);

// //ProjectDocuments <---> Attachments
// ProjectDocuments.hasMany(Attachments, {
//   foriegnKey: {
//     type: DataTypes.INTEGER,
//   },
// });
// Attachments.belongsTo(ProjectDocuments);

//ProjectDetails <---> ProjectServices
ProjectDetails.hasMany(ProjectServices, {
  foriegnKey: {
    type: DataTypes.INTEGER,
  },
});
ProjectServices.belongsTo(ProjectDetails);

module.exports = {
  Users,
  Projects,
  Services,
  Managers,
  ProjectDetails,
  Milestones,
  Attachments,
  Payments,
  // ProjectDocuments,
  ProjectServices,
};
