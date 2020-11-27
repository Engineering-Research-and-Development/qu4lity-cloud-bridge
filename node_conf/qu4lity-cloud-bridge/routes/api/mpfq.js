const router = require('express').Router();
const mariadb = require("mariadb");
const config = require("../../config");
const utils = require("../../utils");

const pool = mariadb.createPool({
  host: config.mpfq_mariadb_host, 
  port: config.mpfq_mariadb_port, 
  database: config.mpfq_mariadb_db,
  user: config.mpfq_mariadb_user, 
  password: config.mpfq_mariadb_password,
  dateStrings : true,
  connectionLimit: 10
});

router.get('/tableList', function(req, res, next){
  var q = "SHOW TABLES";
  var params = [];
  pool.getConnection()
  .then(conn => {
    conn.query(q,params)
      .then((rows) => {
        var data = []
        rows.forEach(row => {
          data.push(row.Tables_in_whr_mpfq_relational);
        });
        return res.json(data);
      })
      .then((res) => {
        conn.end();
      })
      .catch(err => {
        //handle error
        console.log(err); 
        conn.end();
      })     
  }).catch(err => {
    //not connected
  });
});

router.get('/measurementsType', function(req, res, next){

  var q = "SELECT DISTINCT(type) \
          FROM 	Specification";

  var params = [];

  pool.getConnection()
  .then(conn => {
    conn.query(q,params)
      .then((rows) => {
        var data = []
        rows.forEach(row => {
          data.push(row.type);
        });
        return res.json(data);
      })
      .then((res) => {
        conn.end();
      })
      .catch(err => {
        //handle error
        console.log(err); 
        conn.end();
      })     
  }).catch(err => {
    //not connected
  });
});

router.post('/measurementsOfTypeInRange', function(req, res, next){

  var q = "SELECT M.measure_id, \
                  M.dateTime, \
                  MV.m_values \
          FROM 	Specification S, \
                Measure M, \
                MeasureValues MV \
          WHERE S.measure_id = M.measure_id \
          AND M.measure_id = MV.measure_id \
          AND S.type = ? "

  var type = req.body.type;
  var from = req.body.from;
  var to = req.body.to;
  var decoded = true;

  if(from)
    q+="AND M.datetime >= ? ";
  if(to)
    q+="AND M.dateTime <= ? ";
  if(req.body.decoded)
    decoded = (req.body.decoded == 'true');

  let needsDecoding = ["vRMSfreqPump",
                      "aRMSfreqPUMP",
                      "aPeaktimePUMP",
                      "unbalance",
                      "misalignment",
                      "BearingPUMPnt",
                      "BearingPUMPdi",
                      "BearingMotor6",
                      "PumpPiston",
                      "PressureSensor1",
                      "PressureSensor2",
                      "PressureSensor3",
                      "PressureSensor4"
                      ]
                      
  var measureCanBeDecoded = (needsDecoding.indexOf(type) > -1);

  var params = [type,from,to,decoded];

  console.log("Params:",params);

  pool.getConnection()
  .then(conn => {
    conn.query(q,params)
      .then((rows) => {
        var data = []
        rows.forEach(row => {
          var json = {};
          json["measure_id"] = row.measure_id;
          json["dateTime"] = row.dateTime;
         
          if(measureCanBeDecoded && decoded){
            var extracted = utils.iee754Extractor(row.m_values);
            Object.assign(json,extracted);
          }else{
            json["m_values"] = row.m_values;
          }

          data.push(json);
        });
        return res.json(data);
      })
      .then((res) => {
        conn.end();
      })
      .catch(err => {
        //handle error
        console.log(err); 
        conn.end();
      })     
  }).catch(err => {
    //not connected
  });
});

router.post('/measurementsTest', function(req, res, next){

  var q = "SELECT 	JD.journal_id, 	\
                      JD.journalDetails_id, 	\
                      JD.dateTime, \
                      OP.operation_id, \
                      JD.product_id, \
                      JD.station_id, \
                      M.description, 	\
                      M.measure_id, \
                      MV.m_values, 	\
                      M.measureDimension \
          FROM 	JournalDetails JD, \
            Operation OP, \
            Resource R, \
            Resource_Measure RM, \
            Measure M, \
            MeasureValues MV \
          WHERE	JD.operation_id = OP.operation_id \
            AND OP.resource_id = R.resource_id \
            AND R.resource_id = RM.resource_id \
            AND RM.measure_id = M.measure_id \
            AND M.measure_id = MV.measure_id\
            AND JD.datetime >= ? \
            AND JD.dateTime <= ? ";

            
  var from = req.body.from;
  var to = req.body.to;
  var params = [from,to];

  console.log(params);

  pool.getConnection()
  .then(conn => {
    conn.query(q,params)
      .then((rows) => {
        return res.json(rows);
      })
      .then((res) => {
        conn.end();
      })
      .catch(err => {
        //handle error
        console.log(err); 
        conn.end();
      })     
  }).catch(err => {
    //not connected
  });
});

module.exports = router;