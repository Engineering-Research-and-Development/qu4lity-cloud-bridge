/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProcessFailure', {
    processFailure_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    process_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Process',
        key: 'process_id'
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
    recoveryTime: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    occuranceDate: {
      type: DataTypes.DATE(3),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ProcessFailure',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "processFailure_id" },
        ]
      },
      {
        name: "ProcessFailure_fk_1",
        using: "BTREE",
        fields: [
          { name: "process_id" },
        ]
      },
      {
        name: "ProcessFailure_fk_2",
        using: "BTREE",
        fields: [
          { name: "failureType_id" },
        ]
      },
    ]
  });
};
