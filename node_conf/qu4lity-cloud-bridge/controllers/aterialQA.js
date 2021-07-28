const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

exports.findAll = (req, res) => {
    models.MaterialQA.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving MaterialQAs."
            });
        });
};

exports.filterOne = (req, res) => {
    const material_id = req.body.material_id;

    models.MaterialQA.findOne({
        include: [
            {
                model: models.Material, as: 'Material',
            }
        ],
        where: {
            "material_id": { [Op.eq]: `${material_id}` }
        }
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving MaterialQA with id=" + material_id
            });
        });
};