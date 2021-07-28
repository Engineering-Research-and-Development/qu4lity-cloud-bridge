const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

exports.findAll = (req, res) => {

  models.ProductionLine.findAll()
    .then(data => {
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

  models.ProductionLine.findByPk(productionLine_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving ProductionLine with id=" + productionLine_id
      });
    });
};
