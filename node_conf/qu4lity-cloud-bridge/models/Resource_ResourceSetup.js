/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Resource_ResourceSetup', {
    resource_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Resource',
        key: 'resource_id'
      }
    },
    resourceSetup_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ResourceSetup',
        key: 'resourceSetup_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Resource_ResourceSetup',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "resource_id" },
          { name: "resourceSetup_id" },
        ]
      },
      {
        name: "resource_resourceSetup_fk_2",
        using: "BTREE",
        fields: [
          { name: "resourceSetup_id" },
        ]
      },
    ]
  });
};
