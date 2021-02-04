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
      allowNull: false
    },
    dateTime: {
      type: DataTypes.DATE(3),
      allowNull: false
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'product_id'
      }
    },
    operationType_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'OperationType',
        key: 'operationType_id'
      }
    },
    materialUsedAsCarrier_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Material',
        key: 'material_id'
      }
    },
    materialUsedAsTarget_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Material',
        key: 'material_id'
      }
    },
    materialTransformation_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Material',
        key: 'material_id'
      }
    },
    resource_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Resource',
        key: 'resource_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Operation',
    schema: 'whr_mpfq_relational',
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
          { name: "product_id" },
        ]
      },
      {
        name: "operation_fk_2",
        using: "BTREE",
        fields: [
          { name: "operationType_id" },
        ]
      },
      {
        name: "operation_fk_3",
        using: "BTREE",
        fields: [
          { name: "materialUsedAsCarrier_id" },
        ]
      },
      {
        name: "operation_fk_4",
        using: "BTREE",
        fields: [
          { name: "materialUsedAsTarget_id" },
        ]
      },
      {
        name: "operation_fk_5",
        using: "BTREE",
        fields: [
          { name: "materialTransformation_id" },
        ]
      },
      {
        name: "operation_fk_6",
        using: "BTREE",
        fields: [
          { name: "resource_id" },
        ]
      },
    ]
  });
};
