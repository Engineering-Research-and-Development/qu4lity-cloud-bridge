const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

// Retrieve all Stations from the database.
exports.findAll = (req, res) => {
    const machinery_id = req.body.machinery_id

    var condition = {}
    if(machinery_id)
        condition["machinery_id"] =  { [Op.eq]: `${machinery_id}` }

    models.Station.findAll({
        include:[
            { model: models.ProductionLine, as: 'ProductionLine' }
        ],
        where: condition,
        order: [['station_id','ASC']]
    })
    .then(rows => {
      var data = []
      rows.forEach(rowObject => {
        var row = rowObject.dataValues
        var json = {};
        json["station_id"] = row.station_id;
        json["description"] = row.description;
        json["production_line"] = row.ProductionLine.name;
        json["system"] = row.system;
        json["machinery_id"] = row.machinery_id;

        data.push(json);
      });
      res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving measures."
        });
    });
};

// Find a single Station with an id
exports.findOne = (req, res) => {
    const station_id = req.body.station_id;

    models.Station.findByPk(station_id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Station with id=" + station_id
        });
      });
};
