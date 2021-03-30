/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MeasureFailure', {
    measureFailure_id: {
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
    failureType_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'FailureType',
        key: 'failureType_id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    recoveryTime: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MeasureFailure',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "measureFailure_id" },
        ]
      },
      {
        name: "measureFailure_fk_1",
        using: "BTREE",
        fields: [
          { name: "measure_id" },
        ]
      },
      {
        name: "measureFailure_fk_2",
        using: "BTREE",
        fields: [
          { name: "failureType_id" },
        ]
      },
    ]
  });
};
