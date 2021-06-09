const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

exports.findAll = (req, res) => {

  models.JournalDetail.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving JournalDetail."
      });
    });
};

exports.filterOne = (req, res) => {
  const journalDetail_id = req.body.journalDetail_id;

  models.JournalDetail.findByPk(journalDetail_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving JournalDetail with id=" + journalDetail_id
      });
    });
};

exports.filterAll = (req, res) => {

    const journal_id = req.body.journalDetail_id;
    const station_id = req.body.station_id;

    var condition = {}
    if (journalDetail_id)
      condition["journalDetail_id"] = { [Op.eq]: journalDetail_id }
    if (station_id)
    condition["station_id"] = { [Op.eq]: station_id }

    models.JournalDetail.findAll({
      include: [
        {
          model: models.Operation, as: 'Operations',
        },
        {
            model: models.Station, as: 'Stations',
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
            err.message || "Some error occurred while retrieving JournalDetail."
        });
      });
  };