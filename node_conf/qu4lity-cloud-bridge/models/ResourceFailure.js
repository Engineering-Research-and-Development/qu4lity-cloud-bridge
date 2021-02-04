/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ResourceFailure', {
    resourcenFailure_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    resource_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Resource',
        key: 'resource_id'
      }
    },
    failureType_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'FailureType',
        key: 'failureType_id'
      }
    },
    recoveryTime: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    occuranceDate: {
      type: DataTypes.DATE(3),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ResourceFailure',
    schema: 'whr_mpfq_relational',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "resourcenFailure_id" },
        ]
      },
      {
        name: "resourceFailure_fk_1",
        using: "BTREE",
        fields: [
          { name: "resource_id" },
        ]
      },
      {
        name: "resourceFailure_fk_2",
        using: "BTREE",
        fields: [
          { name: "failureType_id" },
        ]
      },
    ]
  });
};
