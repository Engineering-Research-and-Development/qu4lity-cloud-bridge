const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

exports.findAll = (req, res) => {
    models.FunctionQA.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving functionQAs."
            });
        });
};

exports.filterOne = (req, res) => {
    const function_id = req.body.function_id;

    models.FunctionQA.findOne({
        include: [
            {
                model: models.Function, as: 'Function',
            }
        ],
        where: {
            "function_id": { [Op.eq]: `${function_id}` }
        }
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving functionQA with id=" + function_id
            });
        });
};