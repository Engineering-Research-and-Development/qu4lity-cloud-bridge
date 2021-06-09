const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

exports.findAll = (req, res) => {

  models.Material.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Materials."
      });
    });
};

exports.filterOne = (req, res) => {
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

exports.filterAll = (req, res) => {
  const material_id = req.body.material_id;

  var condition = {}
  if (material_id)
    condition["material_id"] = { [Op.eq]: material_id }

  models.Material.findAll({
    include: [
      {
        model: models.WhirlpoolMaterial, as: 'WhirlpoolMaterials',
      }
    ],
    where: condition
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Materials."
      });
    });
};
