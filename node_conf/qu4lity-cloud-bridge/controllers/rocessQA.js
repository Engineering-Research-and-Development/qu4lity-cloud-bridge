const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

exports.findAll = (req, res) => {
    models.ProcessQA.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving ProcessQAs."
            });
        });
};

exports.filterOne = (req, res) => {
    const process_id = req.body.process_id;

    models.ProcessQA.findOne({
        include: [
            {
                model: models.Process, as: 'Process',
            }
        ],
        where: {
            "process_id": { [Op.eq]: `${process_id}` }
        }
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: "Error retrieving ProcessQA with id=" + process_id
            });
        });
};