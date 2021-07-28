const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models


exports.findAll = (req, res) => {

  models.Resource.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Resources."
      });
    });
};

exports.filterOne = (req, res) => {
  const resource_id = req.body.resource_id;
  
  models.Resource.findByPk(resource_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Resource with id=" + resource_id
      });
    });
};

exports.filterAll = (req, res) => {
  const resource_id = req.body.resource_id;
  const measureType = req.body.measureType;
  const from = req.body.from;
  const to = req.body.to;
  const limit = req.body.limit;
  var offset = req.body.offset;

  var condition = {}
  if (resource_id)
    condition["resource_id"] = { [Op.eq]: resource_id }

  var measureCondition = {}
  if (measureType){
    const typeFormatted = measureType.toLowerCase().charAt(0).toUpperCase() + measureType.toLowerCase().slice(1)
    measureCondition["description"] = { 
      [Op.or]: [
        {
          [Op.like]: `DRUM LIFTER ASSEMBLY ${typeFormatted}%` 
        },
        {
          [Op.like]: `DRUM DIMENSIONAL CHECK ${typeFormatted}%` 
        }
      ]
    }
  }

  if (from && to)
    measureCondition["dateTime"] = { [Op.gte]: `${from}`, [Op.lte]: `${to}` }
  else if (from)
    measureCondition["dateTime"] = { [Op.gte]: `${from}` }
  else if (to)
    measureCondition["dateTime"] = { [Op.lte]: `${to}` } 

  if (!offset)
    offset = 0

  models.Resource.findAll({
    include:[
      {
        model: models.ResourceSetup, as: 'ResourceSetups',
      },
      {
        model: models.Measure, as: 'Measures',
        where: measureCondition
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
          err.message || "Some error occurred while retrieving Resources."
      });
    });
};
