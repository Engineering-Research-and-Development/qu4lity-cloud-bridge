const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

exports.findAll = (req, res) => {

    models.Operation.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Operations."
            });
        });
};

exports.filterOne = (req, res) => {
    const operation_id = req.body.operation_id;

    models.Operation.findByPk(material_id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Operation with id=" + operation_id
            });
        });
};

exports.filterAll = (req, res) => {
    const operation_id = req.body.operation_id;
    const carrier = req.body.materialUsedAsCarried_id;
    const target = req.body.materialUsedAsTarget_id;
    const transformation = req.body.materialTransformation_id;

    var condition = {}
    var carrier_condition = {}
    var target_condition = {}
    var transformation_condition = {}

    if (operation_id)
        condition["operation_id"] = { [Op.eq]: operation_id }
    if (carrier){
        condition["materialUsedAsCarrier_id"] = { [Op.eq]: `${carrier}` }
        carrier_condition["material_id"] = { [Op.eq]: `${carrier}` }
    }
    if (target){
        condition["materialUsedAsTarget_id"] = { [Op.eq]: `${target}` }
        target_condition["material_id"] = { [Op.eq]: `${target}` }
    }
    if (transformation){
        condition["materialTransformation_id"] = { [Op.eq]: `${transformation}` }
        transformation_condition["material_id"] = { [Op.eq]: `${transformation}` }
    }
    models.Operation.findAll({
        include: [
            {
                model: models.Material, as: 'MaterialUsedAsCarrier',
                where: carrier_condition
            },
            {
                model: models.Material, as: 'MaterialUsedAsTarget',
                where: target_condition
            },
            {
                model: models.Material, as: 'MaterialTransformation',
                where: transformation_condition
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
                    err.message || "Some error occurred while retrieving Operations."
            });
        });
};
