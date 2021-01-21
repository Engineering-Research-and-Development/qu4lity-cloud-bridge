const router = require('express').Router();

const _function = require("../../controllers/Function.js");
const _measure = require("../../controllers/Measure.js");
const _productionLine = require("../../controllers/ProductionLine.js");
const _station = require("../../controllers/Station.js");

router.post("/function", _function.findOne);
router.post("/functions", _function.findAll);

router.post("/measure", _measure.findOne);
router.post("/measures", _measure.findAll);

router.post("/productionLine", _productionLine.findOne);
router.post("/productionLines", _productionLine.findAll);

router.post("/station", _station.findOne);
router.post("/stations", _station.findAll);

module.exports = router;