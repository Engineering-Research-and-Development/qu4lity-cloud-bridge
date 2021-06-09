/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MaterialQA', {
    materialQA_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    material_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Material',
        key: 'material_id'
      }
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    functionUnit_id: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    tableName: 'MaterialQA',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "materialQA_id" },
        ]
      },
      {
        name: "materialQA_fk",
        using: "BTREE",
        fields: [
          { name: "material_id" },
        ]
      },
    ]
  });
};
