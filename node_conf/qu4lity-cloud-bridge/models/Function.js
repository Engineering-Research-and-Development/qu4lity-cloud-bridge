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
    resource_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Resource',
        key: 'resource_id'
      }
    },
    carrier: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    object: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Function',
    schema: 'whr_mpfq_relational',
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
        name: "function_fk",
        using: "BTREE",
        fields: [
          { name: "resource_id" },
        ]
      },
    ]
  });
};
