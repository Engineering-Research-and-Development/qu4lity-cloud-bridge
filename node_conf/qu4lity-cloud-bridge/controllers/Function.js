const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

// Retrieve all Functions from the database.
exports.findAll = (req, res) => {
    const type = req.body.type;

    var condition = {}
    if(type)
        condition["type"] =  { [Op.eq]: `${type}` }

    models.Function.findAll({
      include:[],
      where: condition,
      order: [['function_id','ASC']]
    })
    .then(rows => {
      var data = []
      rows.forEach(rowObject => {
        var row = rowObject.dataValues
        var json = {};
        json["function_id"] = row.function_id;
        json["type"] = row.type;
        json["carrier"] = row.carrier;
        json["object"] = row.object;
       
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

// Find a single Function with an id
exports.findOne = (req, res) => {
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
