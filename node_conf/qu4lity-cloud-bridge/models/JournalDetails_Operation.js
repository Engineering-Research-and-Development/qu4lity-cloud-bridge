/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('JournalDetails_Operation', {
    journalDetails_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'JournalDetails',
        key: 'journalDetails_id'
      }
    },
    operation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Operation',
        key: 'operation_id'
      }
    }
  }, {
    sequelize,
    tableName: 'JournalDetails_Operation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "journalDetails_id" },
          { name: "operation_id" },
        ]
      },
      {
        name: "journalDetails_operation_fk_2",
        using: "BTREE",
        fields: [
          { name: "operation_id" },
        ]
      },
    ]
  });
};
