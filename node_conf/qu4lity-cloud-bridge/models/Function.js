/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Function', {
    function_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    process_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Process',
        key: 'process_id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    materialUsedAsCarrier_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Material',
        key: 'material_id'
      }
    },
    carrier: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    function: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    materialUsedAsObject_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Material',
        key: 'material_id'
      }
    },
    object: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Function',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "function_id" },
        ]
      },
      {
        name: "function_fk_1",
        using: "BTREE",
        fields: [
          { name: "process_id" },
        ]
      },
      {
        name: "function_fk_2",
        using: "BTREE",
        fields: [
          { name: "materialUsedAsCarrier_id" },
        ]
      },
      {
        name: "function_fk_3",
        using: "BTREE",
        fields: [
          { name: "materialUsedAsObject_id" },
        ]
      },
    ]
  });
};
