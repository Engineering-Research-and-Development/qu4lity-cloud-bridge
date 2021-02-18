const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

// Retrieve all Measures from the database.
exports.findAll = (req, res) => {
    var measureResult = req.body.measureResult
    const from = req.body.from;
    const to = req.body.to;
    const limit = req.body.limit;
    var offset = req.body.offset;
    
  
    var condition = {}
    if(!measureResult)
      measureResult="%"
    if(from && to)
      condition["dateTime"] =  { [Op.gte]: `${from}`, [Op.lte]: `${to}` }
    else if(from)
      condition["dateTime"] =  { [Op.gte]: `${from}` }
    else if(to)
      condition["dateTime"] =  { [Op.lte]: `${to}` }

    if(!offset)
      offset = 0

    models.Measure.findAll({
      include:[
        { model: models.MeasureValues, as: 'MeasureValues' },
        { model: models.Specification, as: 'Specifications'},
        { model: models.MeasureResult, as: 'MeasureResults', where: { description: { [Op.like] : measureResult } } }
      ],
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
        json["dateTime"] = row.dateTime;
        json["type"] = row.type;
        json["measureDimension"] = row.measureDimension;
        json["specDescription"] = row.Specifications[0].description;
        json["specType"] = row.Specifications[0].type;
        json["specUsl"] = row.Specifications[0].usl;
        json["specLsl"] = row.Specifications[0].lsl;
        json["value"] = row.MeasureValues[0].m_values;
        json["result"] = row.MeasureResults[0].description;

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
