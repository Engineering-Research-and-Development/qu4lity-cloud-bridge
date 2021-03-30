/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EngineeringBoM_Material', {
    engineeringBoM_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'EngineeringBoM',
        key: 'engineeringBoM_id'
      }
    },
    material_id: {
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
    tableName: 'EngineeringBoM_Material',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "engineeringBoM_id" },
          { name: "material_id" },
        ]
      },
      {
        name: "engineeringBom_Material_fk_2",
        using: "BTREE",
        fields: [
          { name: "material_id" },
        ]
      },
    ]
  });
};
