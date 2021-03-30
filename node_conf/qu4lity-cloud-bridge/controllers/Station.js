const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

exports.findAll = (req, res) => {

  models.Station.findAll({
    include: [
      { model: models.ProductionLine, as: 'ProductionLine' }
    ],
    order: [['station_id', 'ASC']]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stations."
      });
    });
};

exports.filterOne = (req, res) => {
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

exports.filterAll = (req, res) => {
  const machinery_id = req.body.machinery_id

  var condition = {}
  if (machinery_id)
    condition["machinery_id"] = { [Op.eq]: `${machinery_id}` }

  models.Station.findAll({
    include: [
      { model: models.ProductionLine, as: 'ProductionLine' }
    ],
    where: condition,
    order: [['station_id', 'ASC']]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stations."
      });
    });
};

