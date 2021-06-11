const router = require('express').Router();

const _drumSensor = require("../../controllers/DrumSensor.js");
const _drumTest = require("../../controllers/DrumTest.js");
const _engineeringBoM = require("../../controllers/EngineeringBoM.js");
const _function = require("../../controllers/Function.js");
const _journal = require("../../controllers/Journal.js");
const _journalDetail = require("../../controllers/JournalDetail.js");
const _material = require("../../controllers/Material.js");
const _operation = require("../../controllers/Operation.js");
const _process = require("../../controllers/Process.js");
const _productionLine = require("../../controllers/ProductionLine.js");
const _station = require("../../controllers/Station.js");
const _resource = require("../../controllers/Resource.js");
const _whr_material = require("../../controllers/WhirlpoolMaterial.js");

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

router.get("/journal/list", _journal.findAll);
router.post("/journal/fetch/one", _journal.filterOne);
router.post("/journal/fetch/all", _journal.filterAll);

router.get("/journalDetails/list", _journalDetail.findAll);
router.post("/journalDetails/fetch/one", _journalDetail.filterOne);
router.post("/journalDetails/fetch/all", _journalDetail.filterAll);

router.get("/material/list", _material.findAll);
router.post("/material/fetch/one", _material.filterOne);
router.post("/material/fetch/all", _material.filterAll);

router.get("/process/list", _process.findAll);
router.post("/process/fetch/one", _process.filterOne);
router.post("/process/fetch/all", _process.filterAll);

router.get("/operation/list", _operation.findAll);
router.post("/operation/fetch/one", _operation.filterOne);
router.post("/operation/fetch/all", _operation.filterAll);

router.get("/productionLine/list", _productionLine.findAll);
router.post("/productionLine/fetch/one", _productionLine.filterOne);

router.get("/productionOrder/list", _productionLine.findAll); 
router.post("/productionOrder/fetch/one", _productionLine.filterOne);

router.get("/resource/list", _resource.findAll);
router.post("/resource/fetch/one", _resource.filterOne);
router.post("/resource/fetch/all", _resource.filterAll);

router.get("/station/list", _station.findAll);
router.post("/station/fetch/one", _station.filterOne);

router.get("/whr_material/list", _whr_material.findAll);
router.post("/whr_material/fetch/one", _whr_material.filterOne);

module.exports = router;