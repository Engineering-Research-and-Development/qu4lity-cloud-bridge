const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MeasureKO', {
    measureKO_id: {
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
      allowNull: false,
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
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'MeasureKO',
    schema: 'whr_mpfq_relational',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "measureKO_id" },
        ]
      },
      {
        name: "measureKO_fk_1",
        using: "BTREE",
        fields: [
          { name: "measure_id" },
        ]
      },
      {
        name: "measureKO_fk_2",
        using: "BTREE",
        fields: [
          { name: "failureType_id" },
        ]
      },
      {
        name: "measureKO_fk_3",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
};
