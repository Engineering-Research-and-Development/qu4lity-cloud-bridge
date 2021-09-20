/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Function_MeasureType', {
    function_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Function',
        key: 'function_id'
      }
    },
    measureType: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'Function_MeasureType',
    schema: 'whr_mpfq_relational',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "function_id" },
          { name: "measureType" },
        ]
      },
      {
        name: "function_MeasureType_fk",
        using: "BTREE",
        fields: [
          { name: "function_id" },
        ]
      },
    ]
  });
};
