const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

exports.findAll = (req, res) => {

  models.ProductionLine.findAll({
    order: [['productionLine_id', 'ASC']]
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
          err.message || "Some error occurred while retrieving ProductionLines."
      });
    });
};


exports.filterOne = (req, res) => {
  const productionLine_id = req.body.productionLine_id;

  models.Station.findByPk(productionLine_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving ProductionLine with id=" + productionLine_id
      });
    });
};
