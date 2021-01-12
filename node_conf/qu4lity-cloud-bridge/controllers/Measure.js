const { Specification } = require("../models");
const db = require("../models")
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
      condition["dateTime"] =  { [db.Op.gte]: `${from}`, [db.Op.lte]: `${to}` }
    else if(from)
      condition["dateTime"] =  { [db.Op.gte]: `${from}` }
    else if(to)
      condition["dateTime"] =  { [db.Op.lte]: `${to}` }
    if(type)
      condition["$Specification.type$"] =  { [db.Op.eq]: `${type}` }

    if(!offset)
      offset = 0

    db.Measure.findAll({
      include:[
        { model: db.MeasureValues, as: 'MeasureValues' },
        { model: db.MeasureKO, as: 'MeasureKO' },
        { model: db.Specification, as: 'Specification' }
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
        json["specDescription"] = row.Specification.description;
        json["specType"] = row.Specification.type;
        json["specUsl"] = row.Specification.usl;
        json["specLsl"] = row.Specification.lsl;

        if(toDecode && needsDecoding.indexOf(row.Specification.type) > -1){
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
    const id = req.params.id;

    db.Measure.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Measure with id=" + id
        });
      });
};
