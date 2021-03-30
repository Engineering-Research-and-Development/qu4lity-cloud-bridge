const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

// Retrieve all Functions from the database.
exports.listAll = (req, res) => {
  const type = req.body.function;
  const carrier = req.body.materialUsedAsCarried_id;
  const object = req.body.materialUsedAsObject_id;

  var condition = {}

  if(type)
    condition["function"] =  { [Op.eq]: `${type}` }
  if(carrier)
    condition["materialUsedAsCarrier_id"] =  { [Op.eq]: `${carrier}` }
  if(object)
    condition["materialUsedAsObject_id"] =  { [Op.eq]: `${object}` }

  models.Function.findAll({
    where: condition,
    order: [['function_id','ASC']]
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occurred while retrieving measures."
      });
  });
};

// Retrieve all Functions from the database.
exports.findAll = (req, res) => {
    models.Function.findAll({
      order: [['function_id','ASC']]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving measures."
        });
    });
};

// Find a single Function with an id
exports.findOne = (req, res) => {
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
