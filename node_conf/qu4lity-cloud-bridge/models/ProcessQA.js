/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProcessQA', {
    ProcessQA_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    process_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Process',
        key: 'process_id'
      }
    },
    qa1_drying_performance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    qa2_noise: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    qa3_energy_consumption: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    qa4_component_failure: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    qa5_perceived_quality: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'ProcessQA',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ProcessQA_id" },
        ]
      },
      {
        name: "processQA_fk",
        using: "BTREE",
        fields: [
          { name: "process_id" },
        ]
      },
    ]
  });
};
