const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

exports.findAll = (req, res) => {

    models.ProductionOrder.findAll({
        order: [['dateTime', 'DESC']],
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving ProductionOrders."
            });
        });
};

exports.filterOne = (req, res) => {
    const productionOrder_id = req.body.productionOrder_id;

    models.ProductionOrder.findByPk(productionOrder_id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving ProductionOrder with id=" + productionOrder_id
            });
        });
};