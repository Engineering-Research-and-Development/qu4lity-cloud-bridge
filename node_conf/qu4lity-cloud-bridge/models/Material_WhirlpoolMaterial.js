/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Material_WhirlpoolMaterial', {
    material_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Material',
        key: 'material_id'
      }
    },
    whr_material_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'WhirlpoolMaterial',
        key: 'whr_material_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Material_WhirlpoolMaterial',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "material_id" },
          { name: "whr_material_id" },
        ]
      },
      {
        name: "material_WhirlpoolMaterial_fk_2",
        using: "BTREE",
        fields: [
          { name: "whr_material_id" },
        ]
      },
    ]
  });
};
