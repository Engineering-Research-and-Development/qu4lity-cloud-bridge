/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('JournalDetails', {
    journalDetails_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    journal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Journal',
        key: 'journal_id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    overallResult: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dateTime: {
      type: DataTypes.DATE(3),
      allowNull: false
    },
    overallDefectCode: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    station_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Station',
        key: 'station_id'
      }
    }
  }, {
    sequelize,
    tableName: 'JournalDetails',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "journalDetails_id" },
        ]
      },
      {
        name: "journalDetails_fk_1",
        using: "BTREE",
        fields: [
          { name: "journal_id" },
        ]
      },
      {
        name: "journalDetails_fk_2",
        using: "BTREE",
        fields: [
          { name: "station_id" },
        ]
      },
    ]
  });
};
