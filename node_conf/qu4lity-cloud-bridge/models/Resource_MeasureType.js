/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Resource_MeasureType', {
    resource_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Resource',
        key: 'resource_id'
      }
    },
    measureType: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'Resource_MeasureType',
    schema: 'whr_mpfq_relational',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "resource_id" },
          { name: "measureType" },
        ]
      },
      {
        name: "resource_MeasureType_fk",
        using: "BTREE",
        fields: [
          { name: "resource_id" },
        ]
      },
    ]
  });
};
