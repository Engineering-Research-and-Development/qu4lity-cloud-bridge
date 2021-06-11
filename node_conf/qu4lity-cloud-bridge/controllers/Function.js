const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

exports.findAll = (req, res) => {
  models.Function.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Functions."
      });
    });
};


exports.filterOne = (req, res) => {
  const function_id = req.body.function_id;

  models.Function.findByPk(function_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Function with id=" + function_id
      });
    });
};


exports.filterAll = (req, res) => {
  const function_id = req.body.function_id;
  const type = req.body.function;
  const carrier = req.body.materialUsedAsCarried_id;
  const object = req.body.materialUsedAsObject_id;

  var condition = {}

  if (function_id)
    condition["function_id"] = { [Op.eq]: `${function_id}` }
  if (type)
    condition["function"] = { [Op.eq]: `${type}` }
  if (carrier)
    condition["materialUsedAsCarrier_id"] = { [Op.eq]: `${carrier}` }
  if (object)
    condition["materialUsedAsObject_id"] = { [Op.eq]: `${object}` }

  models.Function.findAll({
    include: [
      {
        model: models.Process, as: 'Process'
      }
    ],
    where: condition
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Functions."
      });
    });
};

