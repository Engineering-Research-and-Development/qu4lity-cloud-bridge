const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models


exports.findAll = (req, res) => {

  models.Process.findAll({
    order: [['process_id', 'ASC']]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving processes."
      });
    });
};


exports.filterOne = (req, res) => {
  const process_id = req.body.process_id;

  models.Process.findByPk(process_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Process with id=" + process_id
      });
    });
};
