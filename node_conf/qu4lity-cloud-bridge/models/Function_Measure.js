/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Function_Measure', {
    function_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Function',
        key: 'function_id'
      }
    },
    measure_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Measure',
        key: 'measure_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Function_Measure',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "function_id" },
          { name: "measure_id" },
        ]
      },
      {
        name: "function_measure_fk_2",
        using: "BTREE",
        fields: [
          { name: "measure_id" },
        ]
      },
    ]
  });
};
