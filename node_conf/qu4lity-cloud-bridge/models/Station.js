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
      allowNull: true
    },
    operationType_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    productionLine_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ProductionLine',
        key: 'productionLine_id'
      }
    },
    system: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    machinery_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Station',
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
