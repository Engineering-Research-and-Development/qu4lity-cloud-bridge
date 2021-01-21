/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Material_Measure', {
    material_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Material',
        key: 'material_id'
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
    tableName: 'Material_Measure',
    schema: 'whr_mpfq_relational',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "material_id" },
          { name: "measure_id" },
        ]
      },
      {
        name: "material_Measure_fk_2",
        using: "BTREE",
        fields: [
          { name: "measure_id" },
        ]
      },
    ]
  });
};
