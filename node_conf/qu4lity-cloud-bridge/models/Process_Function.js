/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Process_Function', {
    process_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Process',
        key: 'process_id'
      }
    },
    function_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Function',
        key: 'function_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Process_Function',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "process_id" },
          { name: "function_id" },
        ]
      },
      {
        name: "process_function_fk_2",
        using: "BTREE",
        fields: [
          { name: "function_id" },
        ]
      },
    ]
  });
};
