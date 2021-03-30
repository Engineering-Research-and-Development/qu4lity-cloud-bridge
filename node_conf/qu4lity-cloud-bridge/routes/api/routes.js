const router = require('express').Router();

const _drumSensor = require("../../controllers/DrumSensor.js");
const _drumTest = require("../../controllers/DrumTest.js");
const _engineeringBoM = require("../../controllers/EngineeringBoM.js");
const _function = require("../../controllers/Function.js");
const _material = require("../../controllers/Material.js");
const _process = require("../../controllers/Process.js");
const _productionLine = require("../../controllers/ProductionLine.js");
const _station = require("../../controllers/Station.js");

router.post("/drum/sensor/fetch/one", _drumSensor.filterOne);
router.post("/drum/sensor/fetch/all", _drumSensor.filterAll);
router.post("/drum/test/fetch/one", _drumTest.filterOne);
router.post("/drum/test/fetch/all", _drumTest.filterAll);

router.get("/engineeringBoM/list", _engineeringBoM.findAll);
router.post("/engineeringBoM/fetch/one", _engineeringBoM.filterOne);
router.post("/engineeringBoM/fetch/all", _engineeringBoM.filterAll);

router.get("/function/list", _function.findAll);
router.post("/function/fetch/one", _function.filterOne);
router.post("/function/fetch/all", _function.filterAll);

router.get("/material/list", _material.findAll);
router.post("/material/fetch/one", _material.filterOne);

router.get("/process/list", _process.findAll);
router.post("/process/fetch/one", _process.filterOne);

router.get("/productionLine/list", _productionLine.findAll);
router.post("/productionLine/fetch/one", _productionLine.filterOne);

router.get("/station/list", _station.findAll);
router.post("/station/fetch/one", _station.filterOne);
router.post("/station/fetch/all", _station.filterAll);

module.exports = router;