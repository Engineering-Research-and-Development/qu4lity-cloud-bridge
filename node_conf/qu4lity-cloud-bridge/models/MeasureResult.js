/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MeasureResult', {
    measureResult_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    measure_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Measure',
        key: 'measure_id'
      }
    },
    failureType_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'FailureType',
        key: 'failureType_id'
      }
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'product_id'
      }
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    recoveryTime: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MeasureResult',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "measureResult_id" },
        ]
      },
      {
        name: "measureResult_fk_1",
        using: "BTREE",
        fields: [
          { name: "measure_id" },
        ]
      },
      {
        name: "measureResult_fk_2",
        using: "BTREE",
        fields: [
          { name: "failureType_id" },
        ]
      },
      {
        name: "measureResult_fk_3",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
};
