const router = require('express').Router();

const _function = require("../../controllers/Function.js");
const _measureTest = require("../../controllers/MeasureTest.js");
const _measureSensor = require("../../controllers/MeasureSensor.js");
const _productionLine = require("../../controllers/ProductionLine.js");
const _station = require("../../controllers/Station.js");

router.post("/function", _function.findOne);
router.post("/functions", _function.findAll);

router.post("/measureTest", _measureTest.findOne);
router.post("/measureTests", _measureTest.findAll);
router.post("/measureSensor", _measureSensor.findOne);
router.post("/measureSensors", _measureSensor.findAll);

router.post("/productionLine", _productionLine.findOne);
router.post("/productionLines", _productionLine.findAll);

router.post("/station", _station.findOne);
router.post("/stations", _station.findAll);

module.exports = router;