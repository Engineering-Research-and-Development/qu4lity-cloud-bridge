/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RecoveryProcedure', {
    recoveryProcedure_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    failureType_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'FailureType',
        key: 'failureType_id'
      }
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'RecoveryProcedure',
    schema: 'whr_mpfq_relational',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "recoveryProcedure_id" },
        ]
      },
      {
        name: "recoveryProcedure_fk_1",
        using: "BTREE",
        fields: [
          { name: "failureType_id" },
        ]
      },
    ]
  });
};
