/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Process', {
    process_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Location',
        key: 'location_id'
      }
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'State',
        key: 'state_id'
      }
    },
    operation_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Operation',
        key: 'operation_id'
      }
    },
    resource_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Resource',
        key: 'resource_id'
      }
    },
    processType_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ProcessType',
        key: 'processType_id'
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Process',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "process_id" },
        ]
      },
      {
        name: "process_fk_1",
        using: "BTREE",
        fields: [
          { name: "location_id" },
        ]
      },
      {
        name: "process_fk_2",
        using: "BTREE",
        fields: [
          { name: "state_id" },
        ]
      },
      {
        name: "process_fk_3",
        using: "BTREE",
        fields: [
          { name: "operation_id" },
        ]
      },
      {
        name: "process_fk_4",
        using: "BTREE",
        fields: [
          { name: "resource_id" },
        ]
      },
      {
        name: "process_fk_5",
        using: "BTREE",
        fields: [
          { name: "processType_id" },
        ]
      },
    ]
  });
};
