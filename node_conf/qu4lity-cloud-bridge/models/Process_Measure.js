/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Process_Measure', {
    process_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Process',
        key: 'process_id'
      }
    },
    measure_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Measure',
        key: 'measure_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Process_Measure',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "process_id" },
          { name: "measure_id" },
        ]
      },
      {
        name: "Process_measure_fk_2",
        using: "BTREE",
        fields: [
          { name: "measure_id" },
        ]
      },
    ]
  });
};
