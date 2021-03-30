/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Operation_OperationFailure', {
    operation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Operation',
        key: 'operation_id'
      }
    },
    operationFailure_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'OperationFailure',
        key: 'operationFailure_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Operation_OperationFailure',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "operation_id" },
          { name: "operationFailure_id" },
        ]
      },
      {
        name: "operation_operationFailure_fk_2",
        using: "BTREE",
        fields: [
          { name: "operationFailure_id" },
        ]
      },
    ]
  });
};
