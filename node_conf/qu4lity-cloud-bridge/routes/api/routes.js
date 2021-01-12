const router = require('express').Router();
const measures = require("../../controllers/Measure.js");

// Retrieve all Measures
router.post("/measures", measures.findAll);

module.exports = router;