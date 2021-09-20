const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

exports.findAll = (req, res) => {

  models.Material.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Materials."
      });
    });
};

exports.filterOne = (req, res) => {
  const material_id = req.body.material_id;

  models.Material.findByPk(material_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Material with id=" + material_id
      });
    });
};

exports.filterAll = (req, res) => {
  const material_id = req.body.material_id;
  const measureType = req.body.measureType;
  const from = req.body.from;
  const to = req.body.to;
  const limit = req.body.limit;
  var offset = req.body.offset;

  var condition = {}
  if (material_id)
    condition["material_id"] = { [Op.eq]: material_id }

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

  models.Material.findAll({
    include: [
      {
        model: models.WhirlpoolMaterial, as: 'WhirlpoolMaterials',
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
          err.message || "Some error occurred while retrieving Materials."
      });
    });
};

exports.filterMeasureType = (req, res) => {
  const material_id = req.body.material_id;
 
  models.Material_MeasureType.findAll({
    where: {
      "material_id": { [Op.eq]: `${material_id}` }
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving MeasureTypes of Materials."
      });
    });
};
