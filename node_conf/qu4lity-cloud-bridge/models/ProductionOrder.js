/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProductionOrder', {
    productionOrder_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    industrialModel_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    commercialModel_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descriptionModel_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    earliestDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    initial_sn: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    final_sn: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    productionLine_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'ProductionLine',
        key: 'productionLine_id'
      }
    }
  }, {
    sequelize,
    tableName: 'ProductionOrder',
    schema: 'whr_mpfq_relational',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productionOrder_id" },
        ]
      },
      {
        name: "productionOrder_fk",
        using: "BTREE",
        fields: [
          { name: "productionLine_id" },
        ]
      },
    ]
  });
};
