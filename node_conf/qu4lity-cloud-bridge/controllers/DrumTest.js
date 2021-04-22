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
  const onlyFailures = req.body.measureFailures
  const type = req.body.type;
  const from = req.body.from;
  const to = req.body.to;
  const limit = req.body.limit;
  var offset = req.body.offset;


  var condition = {}

  if (type){
    const typeFormatted = type.toLowerCase().charAt(0).toUpperCase() + type.toLowerCase().slice(1)
    condition["description"] = { [Op.like]: `DRUM LIFTER ASSEMBLY ${typeFormatted}%` }
  }else
    condition["description"] = { [Op.like]: 'DRUM LIFTER ASSEMBLY%' }

  if (onlyFailures)
    condition["$MeasureFailure.measureFailure_id$"] = { [Op.ne]: null }

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
        model: models.MeasureFailure, as: 'MeasureFailure',
        attributes:["failureType_id", "description"]
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

