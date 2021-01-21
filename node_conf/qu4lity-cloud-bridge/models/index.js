const Sequelize = require("sequelize");
const path = require("path");
const config = require("../config/");

const sequelize = new Sequelize(config.mpfq_mariadb_db, config.mpfq_mariadb_user, config.mpfq_mariadb_password, {
  host: config.mpfq_mariadb_host,
  port: config.mpfq_mariadb_port,
  dialect: "mariadb",
  //operatorsAliases: false,

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

var initModels = require("./init-models");
var models = initModels(sequelize);

var db = {}
db.sequelize = sequelize;

module.exports.db = db;
module.exports.models = models;