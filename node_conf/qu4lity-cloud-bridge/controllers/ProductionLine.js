const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

// Retrieve all ProductionLines from the database.
exports.findAll = (req, res) => {
    const type = req.body.machinery_id

    var condition = {}

    models.ProductionLine.findAll({
        where: condition,
        order: [['productionLine_id','ASC']]
    })
    .then(rows => {
      var data = []
      rows.forEach(rowObject => {
        var row = rowObject.dataValues
        var json = {};
        json["productionLine_id"] = row.productionLine_id;
        json["name"] = row.name;
        json["description"] = row.description;

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

// Find a single ProductionLine with an id
exports.findOne = (req, res) => {
    const productionLine_id = req.body.productionLine_id;

    models.Station.findByPk(productionLine_id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Station with id=" + productionLine_id
        });
      });
};
