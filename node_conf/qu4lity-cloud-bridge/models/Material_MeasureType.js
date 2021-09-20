/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Material_MeasureType', {
    material_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Material',
        key: 'material_id'
      }
    },
    measureType: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'Material_MeasureType',
    schema: 'whr_mpfq_relational',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "material_id" },
          { name: "measureType" },
        ]
      },
      {
        name: "material_MeasureType_fk",
        using: "BTREE",
        fields: [
          { name: "material_id" },
        ]
      },
    ]
  });
};
