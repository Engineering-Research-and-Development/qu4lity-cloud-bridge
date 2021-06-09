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
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    recoveryTime: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    occuranceDate: {
      type: DataTypes.DATE(3),
      allowNull: true
    },
    failureType_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'FailureType',
        key: 'failureType_id'
      }
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
        name: "processFailure_fk",
        using: "BTREE",
        fields: [
          { name: "failureType_id" },
        ]
      },
    ]
  });
};
