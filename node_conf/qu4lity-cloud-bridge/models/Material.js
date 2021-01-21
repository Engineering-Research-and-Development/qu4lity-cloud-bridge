/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Material', {
    material_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    materialModel: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    materialFamily_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'MaterialFamily',
        key: 'materialFamily_id'
      }
    },
    functionUnit_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Material',
    schema: 'whr_mpfq_relational',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "material_id" },
        ]
      },
      {
        name: "material_fk_1",
        using: "BTREE",
        fields: [
          { name: "materialFamily_id" },
        ]
      },
    ]
  });
};
