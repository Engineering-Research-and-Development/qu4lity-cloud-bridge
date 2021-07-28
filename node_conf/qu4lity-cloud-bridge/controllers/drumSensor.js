const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

const utils = require("../utils")

let needsDecoding = ["vRMSfreqPump",
  "aRMSfreqPUMP",
  "aPeaktimePUMP",
  "unbalance",
  "misalignment",
  "BearingPUMPnt",
  "BearingPUMPdi",
  "BearingMotor6",
  "PumpPiston",
  "PressureSensor1",
  "PressureSensor2",
  "PressureSensor3",
  "PressureSensor4"
]


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
  const type = req.body.type;
  const from = req.body.from;
  const to = req.body.to;
  const limit = req.body.limit;
  var offset = req.body.offset;
  const toBeDecoded = req.body.decoded;

  var condition = {}

  if (!type)
    throw "Missing 'type' parameter"
  else{  
    condition["description"] = { [Op.like]: `DRUM Hydraulic Punching SeriesMeasure ${type}%` }
  }

  if (from && to)
    condition["dateTime"] = { [Op.gte]: `${from}`, [Op.lte]: `${to}` }
  else if (from)
    condition["dateTime"] = { [Op.gte]: `${from}` }
  else if (to)
    condition["dateTime"] = { [Op.lte]: `${to}` }

  if (!offset)
    offset = 0

  models.Measure.findAll({
    include: [
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
    .then(rows => {
      var data = []
      rows.forEach(rowObject => {
        var row = rowObject.dataValues

        var json = {};
        json["measure_id"] = row.measure_id;
        json["description"] = row.description;
        json["sensorType"] = type;
        json["measureDimension"] = row.measureDimension;
        json["measureType"] = row.measureType;
        json["dateTime"] = row.dateTime;
        json["dataSeriesUSL"] = row.dataSeriesUSL;
        json["dataSeriesLSL"] = row.dataSeriesLSL;
        json["dataSeriesLSL"] = row.dataSeriesLSL;
        json["Function_Measures"] = row.Function_Measures;
        json["Material_Measures"] = row.Material_Measures;
        json["Resource_Measures"] = row.Resource_Measures;

        if (toBeDecoded != null && toBeDecoded == true && needsDecoding.indexOf(type) > -1) {
          var extracted = utils.iee754Extractor(row.dataSeriesValue);
          Object.assign(json, extracted);
        } else {
          json["dataSeriesValue"] = row.dataSeriesValue;
        }

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

