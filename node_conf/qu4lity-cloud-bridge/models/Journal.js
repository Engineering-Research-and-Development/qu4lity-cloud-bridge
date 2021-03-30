/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Journal', {
    journal_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    productionOrder_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'ProductionOrder',
        key: 'productionOrder_id'
      }
    },
    industrialModel_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    productionLine_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ProductionLine',
        key: 'productionLine_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Journal',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "journal_id" },
        ]
      },
      {
        name: "journal_fk_1",
        using: "BTREE",
        fields: [
          { name: "productionOrder_id" },
        ]
      },
      {
        name: "journal_fk_2",
        using: "BTREE",
        fields: [
          { name: "productionLine_id" },
        ]
      },
    ]
  });
};
