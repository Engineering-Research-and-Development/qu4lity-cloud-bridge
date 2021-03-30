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

// Retrieve all Measures from the database.
exports.findAll = (req, res) => {
    const measureSpecification = req.body.measureSpecification;
    const from = req.body.from;
    const to = req.body.to;
    const limit = req.body.limit;
    var offset = req.body.offset;
    const toBeDecoded = req.body.decoded ;
    var toDecode = true;

    if(!measureSpecification)
        throw "Missing 'measureSpecification' parameter"

    if(toBeDecoded)
        toDecode = (toBeDecoded == 'true')

    var condition = {}
    if(from && to)
      condition["dateTime"] =  { [Op.gte]: `${from}`, [Op.lte]: `${to}` }
    else if(from)
      condition["dateTime"] =  { [Op.gte]: `${from}` }
    else if(to)
      condition["dateTime"] =  { [Op.lte]: `${to}` }

    if(measureSpecification)
      condition["MeasureSpecification"] = { [Op.eq]: `${measureSpecification}` }

    if(!offset)
      offset = 0

    models.Measure.findAll({
      where: condition,
      order: [['dateTime','DESC']],
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
        json["measureSpecification"] = row.measureSpecification;
        json["measureDimension"] = row.measureDimension;
        json["measureType"] = row.measureType;
        json["dateTime"] = row.dateTime;
        json["dataSeriesUSL"] = row.dataSeriesUSL;
        json["dataSeriesLSL"] = row.dataSeriesLSL;

        if(toDecode && needsDecoding.indexOf(row.measureSpecification) > -1){
          var extracted = utils.iee754Extractor(row.dataSeriesValue);
          Object.assign(json,extracted);
        }else{
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

// Find a single Measure with an id
exports.findOne = (req, res) => {
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
