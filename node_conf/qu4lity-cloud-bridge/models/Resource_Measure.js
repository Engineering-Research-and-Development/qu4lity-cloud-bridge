/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Resource_Measure', {
    resource_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Resource',
        key: 'resource_id'
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
    tableName: 'Resource_Measure',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "resource_id" },
          { name: "measure_id" },
        ]
      },
      {
        name: "resource_measure_fk_2",
        using: "BTREE",
        fields: [
          { name: "measure_id" },
        ]
      },
    ]
  });
};
