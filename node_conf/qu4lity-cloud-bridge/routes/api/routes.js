const router = require('express').Router();

const _engineeringBoM = require("../../controllers/EngineeringBoM.js");
const _function = require("../../controllers/Function.js");
const _drumTest = require("../../controllers/DrumTest.js");
const _drumSensor = require("../../controllers/DrumSensor.js");
const _material = require("../../controllers/Material.js");
const _process = require("../../controllers/Process.js");
const _productionLine = require("../../controllers/ProductionLine.js");
const _station = require("../../controllers/Station.js");

router.post("/engineeringBoM/fetch/one", _engineeringBoM.findOne);
router.get("/engineeringBoM/fetch/all", _engineeringBoM.findAll);
router.post("/engineeringBoM/list/all", _engineeringBoM.listAll);

router.post("/function/fetch/one", _function.findOne);
router.get("/function/fetch/all", _function.findAll);
router.post("/function/list/all", _function.listAll);

router.post("/drum/test/fetch/one", _drumTest.findOne);
router.get("/drum/test/fetch/all", _drumTest.findAll);
router.post("/drum/sensor/fetch/one", _drumSensor.findOne);
router.get("/drum/sensor/fetch/all", _drumSensor.findAll);

router.post("/material/fetch/one", _material.findOne);
router.get("/material/fetch/all", _material.findAll);

router.post("/process/fetch/one", _process.findOne);
router.get("/process/fetch/all", _process.findAll);

router.post("/productionLine/fetch/one", _productionLine.findOne);
router.get("/productionLine/fetch/all", _productionLine.findAll);

router.post("/station/fetch/one", _station.findOne);
router.get("/station/fetch/all", _station.findAll);

module.exports = router;