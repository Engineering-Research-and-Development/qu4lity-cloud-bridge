const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../models").models

exports.findAll = (req, res) => {

  models.JournalDetails.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving JournalDetails."
      });
    });
};

exports.filterOne = (req, res) => {
  const journalDetails_id = req.body.journalDetails_id;

  models.JournalDetails.findByPk(journalDetails_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving JournalDetails with id=" + journalDetails_id
      });
    });
};

exports.filterAll = (req, res) => {

    const journalDetails_id = req.body.journalDetails_id;
    const station_id = req.body.station_id;

    var condition = {}
    if (journalDetail_id)
      condition["journalDetails_id"] = { [Op.eq]: journalDetails_id }
    if (station_id)
    condition["station_id"] = { [Op.eq]: station_id }

    models.JournalDetails.findAll({
      include: [
        {
          model: models.Journal, as: 'Journal',
        },
        {
          model: models.Operation, as: 'Operations',
        },
        {
            model: models.Station, as: 'Station',
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
            err.message || "Some error occurred while retrieving JournalDetails."
        });
      });
  };