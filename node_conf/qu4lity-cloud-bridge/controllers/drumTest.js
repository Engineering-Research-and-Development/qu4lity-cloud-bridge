const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

exports.filterOne = (req, res) => {
  const measure_id = req.body.measure_id;

  models.Measure.findByPk(measure_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Measure with id=" + measure_id
      });
    });
};


exports.filterAll = (req, res) => {
  const onlyFailures = req.body.onlyFailures
  const type = req.body.type;
  const from = req.body.from;
  const to = req.body.to;
  const limit = req.body.limit;
  var offset = req.body.offset;


  var condition = {}
  var measureFailureCondition = {}

  if (type){
    condition["description"] = { [Op.eq]: `${measureType}` } 
  }

  if (onlyFailures)
    measureFailureCondition["measureFailure_id"] = { [Op.ne]: null }

  if (from && to)
    condition["dateTime"] = { [Op.gte]: `${from}`, [Op.lte]: `${to}` }
  else if (from)
    condition["dateTime"] = { [Op.gte]: `${from}` }
  else if (to)
    condition["dateTime"] = { [Op.lte]: `${to}` } 

  if (!offset)
    offset = 0

  models.Measure.findAll({
    attributes: ["measure_id", "description", "measureDimension", "measureType", "dateTime", "dataSingleValue", "usl", "lsl"],
    include: [
      {
        model: models.MeasureFailure, as: 'MeasureFailures',
        where: measureFailureCondition,
        include : [
          {
            model: models.FailureType, as: 'FailureType'
          }
        ]
      },
      {
        model: models.Function_Measure, as: 'Function_Measures',
      },
      {
        model: models.Material_Measure, as: 'Material_Measures',
      },
      {
        model: models.Resource_Measure, as: 'Resource_Measures',
      }
    ],
    where: condition,
    order: [['dateTime', 'DESC']],
    limit: limit,
    offset: offset
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving measures."
      });
    });
};

