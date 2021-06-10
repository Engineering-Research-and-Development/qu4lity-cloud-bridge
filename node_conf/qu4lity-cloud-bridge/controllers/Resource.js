const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models


exports.findAll = (req, res) => {

  models.Resource.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Resources."
      });
    });
};

exports.filterOne = (req, res) => {
  const resource_id = req.body.resource_id;
  
  models.Resource.findByPk(resource_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Resource with id=" + resource_id
      });
    });
};

exports.filterAll = (req, res) => {
  const resource_id = req.body.resource_id;

  var condition = {}
  if (resource_id)
    condition["resource_id"] = { [Op.eq]: resource_id }

  models.Resource.findAll({
    include:[
      {
        model: models.Material, as: 'Materials',
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
          err.message || "Some error occurred while retrieving Resources."
      });
    });
};
