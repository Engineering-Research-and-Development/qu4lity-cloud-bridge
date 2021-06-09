/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Process_ProcessFailure', {
    process_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Process',
        key: 'process_id'
      }
    },
    processFailure_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ProcessFailure',
        key: 'processFailure_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Process_ProcessFailure',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "process_id" },
          { name: "processFailure_id" },
        ]
      },
      {
        name: "process_processFailure_fk_2",
        using: "BTREE",
        fields: [
          { name: "processFailure_id" },
        ]
      },
    ]
  });
};
