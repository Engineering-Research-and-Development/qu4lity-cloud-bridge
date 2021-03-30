/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Operation', {
    operation_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    materialUsedAsCarrier_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Material',
        key: 'material_id'
      }
    },
    materialUsedAsTarget_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Material',
        key: 'material_id'
      }
    },
    materialTransformation_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Material',
        key: 'material_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Operation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "operation_id" },
        ]
      },
      {
        name: "operation_fk_1",
        using: "BTREE",
        fields: [
          { name: "materialUsedAsCarrier_id" },
        ]
      },
      {
        name: "operation_fk_2",
        using: "BTREE",
        fields: [
          { name: "materialUsedAsTarget_id" },
        ]
      },
      {
        name: "operation_fk_3",
        using: "BTREE",
        fields: [
          { name: "materialTransformation_id" },
        ]
      },
    ]
  });
};
