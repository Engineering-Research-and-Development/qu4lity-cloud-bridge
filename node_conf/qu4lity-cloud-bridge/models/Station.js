/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Station', {
    station_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    operationType_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    productionLine_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'ProductionLine',
        key: 'productionLine_id'
      }
    },
    system: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    machinery_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Station',
    schema: 'whr_mpfq_relational',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "station_id" },
        ]
      },
      {
        name: "station_fk",
        using: "BTREE",
        fields: [
          { name: "productionLine_id" },
        ]
      },
    ]
  });
};
