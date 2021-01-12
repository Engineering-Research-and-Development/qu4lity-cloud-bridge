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


const db = {};
const DataTypes = Sequelize.DataTypes;
const Op = Sequelize.Op;

db.FailureType    = require(path.join(__dirname, '/FailureType.js'))(sequelize, DataTypes)
db.Measure        = require(path.join(__dirname, '/Measure.js'))(sequelize, DataTypes)
db.MeasureKO      = require(path.join(__dirname, '/MeasureKO.js'))(sequelize, DataTypes)
db.MeasureValues  = require(path.join(__dirname, '/MeasureValues.js'))(sequelize, DataTypes)
db.Product        = require(path.join(__dirname, '/Product.js'))(sequelize, DataTypes)
db.Specification  = require(path.join(__dirname, '/Specification.js'))(sequelize, DataTypes)

db.sequelize = sequelize;
db.DataTypes = DataTypes;
db.Op = Op;

db.Measure.hasOne(db.MeasureValues, { 
  foreignKey: "measure_id", 
  as: "MeasureValues" 
});
db.Measure.hasOne(db.MeasureKO, { 
  foreignKey: "measure_id", 
  as: "MeasureKO" 
});
db.Measure.hasOne(db.Specification, { 
  foreignKey: "measure_id", 
  as: "Specification" 
});


db.MeasureValues.belongsTo(db.Measure, {
  foreignKey: "measure_id",
  as: "Measure",
});


db.MeasureKO.belongsTo(db.Measure, {
  foreignKey: "measure_id",
  as: "Measure",
});
db.MeasureKO.belongsTo(db.Product, {
  foreignKey: "product_id",
  as: "Product",
});

db.MeasureKO.hasOne(db.FailureType, { 
  foreignKey: "failureType_id",
  as: "FailureType" 
});

db.Specification.belongsTo(db.Measure, {
  foreignKey: "measure_id",
  as: "Measure",
});

db.Product.hasMany(db.MeasureKO, { 
  foreignKey: "product_id", 
  as: "MeasureKO" 
});

db.FailureType.belongsTo(db.MeasureKO, {
  foreignKey: "failureType_id",
  as: "MeasureKO",
});

module.exports = db;