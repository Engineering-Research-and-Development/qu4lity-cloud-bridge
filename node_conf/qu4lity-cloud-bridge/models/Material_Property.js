/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Material_Property', {
    material_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Material',
        key: 'material_id'
      }
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Property',
        key: 'property_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Material_Property',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "material_id" },
          { name: "property_id" },
        ]
      },
      {
        name: "Material_Property_material_id_property_id_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "material_id" },
          { name: "property_id" },
        ]
      },
      {
        name: "material_property_fk_2",
        using: "BTREE",
        fields: [
          { name: "property_id" },
        ]
      },
    ]
  });
};
