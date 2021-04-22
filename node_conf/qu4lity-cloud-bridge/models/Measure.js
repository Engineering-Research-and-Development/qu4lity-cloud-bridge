/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Measure', {
    measure_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    measureDimension: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    measureType: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dataDivisor: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    measure_prog_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dateTime: {
      type: DataTypes.DATE(3),
      allowNull: false
    },
    dataSeriesValue: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dataSeriesUSL: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dataSeriesLSL: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dataSingleValue: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    usl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lsl: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Measure',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "measure_id" },
        ]
      },
    ]
  });
};
