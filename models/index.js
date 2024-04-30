'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize-cockroachdb');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
//const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;

// const connectionString = "postgres://postgres.casjypnfqwpjomgtqvfb:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
const connectionString = "postgresql://algorimsoftware:DVtNRJtautVzt_yXnV61_A@sparse-mummy-7987.8nk.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full"
sequelize = new Sequelize(connectionString, {
  dialectOptions: {
    application_name: "docs_simplecrud_node-sequelize",
  },
  logging:false
});

// 4Bi5g88B9Zx4exEL_J4ZOQ

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;