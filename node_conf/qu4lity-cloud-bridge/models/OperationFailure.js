/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OperationFailure', {
    operationFailure_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    tableName: 'OperationFailure',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "operationFailure_id" },
        ]
      },
      {
        name: "operationFailure_fk",
        using: "BTREE",
        fields: [
          { name: "failureType_id" },
        ]
      },
    ]
  });
};
