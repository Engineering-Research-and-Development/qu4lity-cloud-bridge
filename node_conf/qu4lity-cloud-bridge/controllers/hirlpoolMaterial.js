const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

exports.findAll = (req, res) => {

  models.WhirlpoolMaterial.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving whr_materials."
      });
    });
};


exports.filterOne = (req, res) => {
  const whr_material_id = req.body.whr_material_id;

  models.WhirlpoolMaterial.findByPk(material_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving WhirlpoolMaterial with id=" + whr_material_id
      });
    });
};

