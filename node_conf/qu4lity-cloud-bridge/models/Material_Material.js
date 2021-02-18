/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Material_Material', {
    material_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Material',
        key: 'material_id'
      }
    },
    subMaterial_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Material',
        key: 'material_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Material_Material',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "material_id" },
          { name: "subMaterial_id" },
        ]
      },
      {
        name: "materialComposition_fk_2",
        using: "BTREE",
        fields: [
          { name: "subMaterial_id" },
        ]
      },
    ]
  });
};
