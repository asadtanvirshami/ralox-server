const { DataTypes } = require('sequelize');
const {Users,Projects,Services,Managers,ProjectDetails } = require("../../models");

Users.hasMany(Projects,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
Projects.belongsTo(Users);

Services.hasMany(ProjectDetails,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
ProjectDetails.belongsTo(Services);

Managers.hasOne(Projects,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
Projects.belongsTo(Managers);


module.exports = { Projects,Managers,Services,Users }