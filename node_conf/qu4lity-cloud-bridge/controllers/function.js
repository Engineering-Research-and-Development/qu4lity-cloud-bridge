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


exports.findByParameters = (req, res) => {
  const function_id = req.body.function_id;
  const type = req.body.function;
  const carrier = req.body.materialUsedAsCarrier_id;
  const object = req.body.materialUsedAsObject_id;
  const limit = req.body.limit;
  var offset = req.body.offset;

  var condition = {}

  if (function_id)
    condition["function_id"] = { [Op.eq]: `${function_id}` }
  if (type)
    condition["function"] = { [Op.eq]: `${type}` }
  if (carrier)
    condition["materialUsedAsCarrier_id"] = { [Op.eq]: `${carrier}` }
  if (object)
    condition["materialUsedAsObject_id"] = { [Op.eq]: `${object}` }

  if (!offset)
    offset = 0
    
  models.Function.findAll({
    include: [
      {
        model: models.Process, as: 'Processes'
      }
    ],
    where: condition,
    limit: limit,
    offset: offset
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
  const carrier = req.body.materialUsedAsCarrier_id;
  const object = req.body.materialUsedAsObject_id;
  const measureType = req.body.measureType;
  const from = req.body.from;
  const to = req.body.to;
  const limit = req.body.limit;
  var offset = req.body.offset;

  var condition = {}

  if (function_id)
    condition["function_id"] = { [Op.eq]: `${function_id}` }
  if (type)
    condition["function"] = { [Op.eq]: `${type}` }
  if (carrier)
    condition["materialUsedAsCarrier_id"] = { [Op.eq]: `${carrier}` }
  if (object)
    condition["materialUsedAsObject_id"] = { [Op.eq]: `${object}` }

  var measureCondition = {}

  if (measureType){
    measureCondition["description"] = { [Op.eq]: `${measureType}` }
  }

  if (from && to)
    measureCondition["dateTime"] = { [Op.gte]: `${from}`, [Op.lte]: `${to}` }
  else if (from)
    measureCondition["dateTime"] = { [Op.gte]: `${from}` }
  else if (to)
    measureCondition["dateTime"] = { [Op.lte]: `${to}` } 

  if (!offset)
    offset = 0
    
  models.Function.findAll({
    include: [
      {
        model: models.Process, as: 'Processes'
      },
      {
        model: models.Measure, as: 'Measures',
        where: measureCondition
      }
    ],
    where: condition,
    limit: limit,
    offset: offset
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

exports.filterMeasureType = (req, res) => {
  const function_id = req.body.function_id;
 
  models.Function_MeasureType.findAll({
    where: {
      "function_id": { [Op.eq]: `${function_id}` }
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving MeasureTypes of Functions."
      });
    });
};

