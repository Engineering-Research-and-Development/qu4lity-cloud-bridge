/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Resource', {
    resource_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    setup_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Setup',
        key: 'setup_id'
      }
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Resource',
    schema: 'whr_mpfq_relational',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "resource_id" },
        ]
      },
      {
        name: "resource_fk",
        using: "BTREE",
        fields: [
          { name: "setup_id" },
        ]
      },
    ]
  });
};
