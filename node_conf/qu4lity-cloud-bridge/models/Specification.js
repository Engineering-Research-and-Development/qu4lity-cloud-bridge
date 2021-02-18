/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Specification', {
    specification_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    measure_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Measure',
        key: 'measure_id'
      }
    },
    dataSeriesUSL: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dataSeriesLSL: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    usl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lsl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Specification',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "specification_id" },
        ]
      },
      {
        name: "specification_fk",
        using: "BTREE",
        fields: [
          { name: "measure_id" },
        ]
      },
    ]
  });
};
