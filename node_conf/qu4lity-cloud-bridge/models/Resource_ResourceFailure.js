/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Resource_ResourceFailure', {
    resource_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Resource',
        key: 'resource_id'
      }
    },
    resourceFailure_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ResourceFailure',
        key: 'resourceFailure_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Resource_ResourceFailure',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "resource_id" },
          { name: "resourceFailure_id" },
        ]
      },
      {
        name: "resource_resourceFailure_fk_2",
        using: "BTREE",
        fields: [
          { name: "resourceFailure_id" },
        ]
      },
    ]
  });
};
