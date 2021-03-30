/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProductionOrder', {
    productionOrder_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    industrialModel_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    commercialModel_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    descriptionModel: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('current_timestamp')
    },
    earliestDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00"
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00"
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
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
      allowNull: true,
      references: {
        model: 'ProductionLine',
        key: 'productionLine_id'
      }
    }
  }, {
    sequelize,
    tableName: 'ProductionOrder',
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
