const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

// Retrieve all ProductionLines from the database.
exports.findAll = (req, res) => {
    var condition = {}

    models.Material.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving materials."
        });
    });
};

// Find a single ProductionLine with an id
exports.findOne = (req, res) => {
    const material_id = req.body.material_id;

    models.Material.findByPk(material_id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Material with id=" + material_id
        });
      });
};