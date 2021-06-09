const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

exports.findAll = (req, res) => {

  models.Journal.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Journal."
      });
    });
};

exports.filterOne = (req, res) => {
  const journal_id = req.body.journal_id;

  models.Journal.findByPk(journal_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Journal with id=" + journal_id
      });
    });
};

exports.filterAll = (req, res) => {

    const journal_id = req.body.journal_id;
    const productionOrder_id = req.body.productionOrder_id;

    var condition = {}
    if (journal_id)
      condition["journal_id"] = { [Op.eq]: journal_id }
    if (productionOrder_id)
    condition["productionOrder_id"] = { [Op.eq]: productionOrder_id }

    models.Journal.findAll({
      include: [
        {
          model: models.ProductionOrder, as: 'ProductionOrder',
        },
        {
            model: models.ProductionLine, as: 'ProductionLine',
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
            err.message || "Some error occurred while retrieving Journal."
        });
      });
  };