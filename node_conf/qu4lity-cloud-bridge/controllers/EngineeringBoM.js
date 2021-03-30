const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

// Retrieve all ProductionLines from the database.
exports.listAll = (req, res) => {
    const engineeringBoM_id = req.body.engineeringBoM_id;
    const material_id = req.body.material_id;

    var condition = {}

    if(engineeringBoM_id)
    condition["engineeringBoM_id"] =  { [Op.eq]: `${engineeringBoM_id}` }
     if(material_id)
    condition["material_id"] =  { [Op.eq]: `${material_id}` }

    models.EngineeringBoM_Material.findAll({
        attributes: [],
        include:[
            { 
                model: models.EngineeringBoM, as: 'EngineeringBoM',
                required: true
            },
            { 
                model: models.Material, as: 'Material',
                required: true
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
            err.message || "Some error occurred while retrieving materials."
        });
    });
};

// Retrieve all ProductionLines from the database.
exports.findAll = (req, res) => {

    models.EngineeringBoM.findAll()
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
    const engineeringBoM_id = req.body.material_id;

    models.EngineeringBoM.findByPk(engineeringBoM_id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving EngineeringBoM with id=" + engineeringBoM_id
        });
      });
};