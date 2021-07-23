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
    used: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    material_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Material',
        key: 'material_id'
      }
    },
    qa1_drying_performance: {
      type: DataTypes.DECIMAL(3,1),
      allowNull: false,
      defaultValue: 0.0
    },
    qa2_noise: {
      type: DataTypes.DECIMAL(3,1),
      allowNull: false,
      defaultValue: 0.0
    },
    qa3_energy_consumption: {
      type: DataTypes.DECIMAL(3,1),
      allowNull: false,
      defaultValue: 0.0
    },
    qa4_component_failure: {
      type: DataTypes.DECIMAL(3,1),
      allowNull: false,
      defaultValue: 0.0
    },
    qa5_perceived_quality: {
      type: DataTypes.DECIMAL(3,1),
      allowNull: false,
      defaultValue: 0.0
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
