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
    const type = req.body.type;
    const from = req.body.from;
    const to = req.body.to;
    const limit = req.body.limit;
    var offset = req.body.offset;
    const toBeDecoded = req.body.decoded ;
    var toDecode = true;

    if(toBeDecoded)
        toDecode = (toBeDecoded == 'true')

    var condition = {}
    if(from && to)
      condition["dateTime"] =  { [Op.gte]: `${from}`, [Op.lte]: `${to}` }
    else if(from)
      condition["dateTime"] =  { [Op.gte]: `${from}` }
    else if(to)
      condition["dateTime"] =  { [Op.lte]: `${to}` }
    if(type)
      condition["$Specification.type$"] =  { [Op.eq]: `${type}` }

    if(!offset)
      offset = 0

    models.Measure.findAll({
      include:[
        { model: models.MeasureValues, as: 'MeasureValues' },
        //{ model: models.MeasureKO, as: 'MeasureKO' },
        { model: models.Specification, as: 'Specifications' }
      ],
      where: condition,
      order: [['measure_id','DESC']],
      limit: limit,
      offset: offset
    })
    .then(rows => {
      var data = []
      rows.forEach(rowObject => {
        var row = rowObject.dataValues
        var json = {};
        json["measure_id"] = row.measure_id;
        json["dateTime"] = row.dateTime;
        json["type"] = row.type;
        json["measureDimension"] = row.measureDimension;
        json["specDescription"] = row.Specifications.description;
        json["specType"] = row.Specifications.type;
        json["specUsl"] = row.Specifications.usl;
        json["specLsl"] = row.Specifications.lsl;

        if(toDecode && needsDecoding.indexOf(row.Specifications.type) > -1){
          var extracted = utils.iee754Extractor(row.MeasureValues.m_values);
          Object.assign(json,extracted);
        }else{
          json["value"] = row.MeasureValues.m_values;
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
