CREATE DATABASE IF NOT EXISTS whr_mpfq_relational;
USE whr_mpfq_relational;

CREATE TABLE IF NOT EXISTS FailureType (
  failureType_id INT NOT NULL AUTO_INCREMENT,
  description TEXT(64) NOT NULL,
  note TEXT(128),
  PRIMARY KEY (failureType_id)
);
CREATE TABLE IF NOT EXISTS RecoveryProcedure (
  recoveryProcedure_id INT NOT NULL AUTO_INCREMENT,
  failureType_id INT NOT NULL,
  description TEXT(64) NOT NULL,
  PRIMARY KEY (recoveryProcedure_id),
  CONSTRAINT recoveryProcedure_fk FOREIGN KEY (failureType_id) REFERENCES FailureType(failureType_id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS Measure (
  measure_id INT NOT NULL AUTO_INCREMENT,
  description TEXT(64),
  measureDimension TEXT(16),
  measureType INT NOT NULL DEFAULT 1, # 1 single value, 2 array value
  dataDivisor TEXT(16),
  measure_prog_id INT,
  dateTime DATETIME(3) NOT NULL,
  dataSeriesValue TEXT(256),
  dataSeriesUSL TEXT(64),
  dataSeriesLSL TEXT(64),
  dataSingleValue FLOAT, 
  usl TEXT(16),
  lsl TEXT(16),
  PRIMARY KEY (measure_id)
);
CREATE TABLE IF NOT EXISTS MeasureFailure (
  measureFailure_id INT NOT NULL AUTO_INCREMENT,
  measure_id INT NOT NULL,
  failureType_id INT,
  description TEXT(64),
  recoveryTime INT,
  PRIMARY KEY (measureFailure_id),
  CONSTRAINT measureFailure_fk_1 FOREIGN KEY (measure_id) REFERENCES Measure(measure_id) ON DELETE CASCADE,
  CONSTRAINT measureFailure_fk_2 FOREIGN KEY (failureType_id) REFERENCES FailureType(failureType_id) ON DELETE CASCADE
  );
  
-- ---------------------------------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS Property (
  property_id INT NOT NULL AUTO_INCREMENT,
  description TEXT(64) NOT NULL,
  property1 TEXT(64),
  property2 TEXT(64),
  property3 TEXT(64),
  property4 TEXT(64),
  property5 TEXT(64),
  PRIMARY KEY (property_id)
);
CREATE TABLE IF NOT EXISTS MaterialFamily (
  materialFamily_id INT NOT NULL AUTO_INCREMENT,
  description TEXT(64) NOT NULL,
  PRIMARY KEY (materialFamily_id)
);
CREATE TABLE IF NOT EXISTS Material (
  material_id BIGINT NOT NULL AUTO_INCREMENT,
  description TEXT(64),
  materialModel TEXT(32),
  materialFamily_id INT,
  property_id INT,
  functionUnit_id INT,
  PRIMARY KEY (material_id),
  CONSTRAINT material_fk_1 FOREIGN KEY (materialFamily_id) REFERENCES MaterialFamily(materialFamily_id) ON DELETE SET NULL,
  CONSTRAINT material_fk_2 FOREIGN KEY (property_id) REFERENCES Property(property_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS WhirlpoolMaterial (
  whr_material_id BIGINT NOT NULL AUTO_INCREMENT,
  description TEXT(64),
  materialRevisionECN TEXT(32),
  materialDrawingNumber TEXT(32),
  PRIMARY KEY (whr_material_id)
);
CREATE TABLE IF NOT EXISTS Material_WhirlpoolMaterial (
  material_id BIGINT NOT NULL,
  whr_material_id BIGINT NOT NULL,
  PRIMARY KEY (material_id, whr_material_id),
  CONSTRAINT material_WhirlpoolMaterial_fk_1 FOREIGN KEY (material_id) REFERENCES Material(material_id) ON DELETE CASCADE,
  CONSTRAINT material_WhirlpoolMaterial_fk_2 FOREIGN KEY (whr_material_id) REFERENCES WhirlpoolMaterial(whr_material_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS Material_Measure (
  material_id BIGINT NOT NULL,
  measure_id INT NOT NULL,
  PRIMARY KEY (material_id, measure_id),
  CONSTRAINT material_Measure_fk_1 FOREIGN KEY (material_id) REFERENCES Material(material_id) ON DELETE CASCADE,
  CONSTRAINT material_Measure_fk_2 FOREIGN KEY (measure_id) REFERENCES Measure(measure_id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS EngineeringBoM (
  engineeringBoM_id BIGINT NOT NULL AUTO_INCREMENT,
  description TEXT(64),
  PRIMARY KEY (engineeringBoM_id)
);
CREATE TABLE IF NOT EXISTS EngineeringBoM_Material (
  engineeringBoM_id BIGINT NOT NULL,
  material_id BIGINT NOT NULL,
  quantity INT,
  PRIMARY KEY (engineeringBoM_id, material_id),
  CONSTRAINT engineeringBom_Material_fk_1 FOREIGN KEY (engineeringBoM_id) REFERENCES EngineeringBoM(engineeringBoM_id) ON DELETE CASCADE,
  CONSTRAINT engineeringBom_Material_fk_2 FOREIGN KEY (material_id) REFERENCES Material(material_id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ProductionLine (
  productionLine_id INT NOT NULL AUTO_INCREMENT,
  name TEXT(32) NOT NULL,
  description TEXT(64),
  note TEXT(128),
  PRIMARY KEY (productionLine_id)
);
CREATE TABLE IF NOT EXISTS ProductionOrder (
  productionOrder_id BIGINT NOT NULL AUTO_INCREMENT,
  industrialModel_id BIGINT NOT NULL,
  commercialModel_id BIGINT NOT NULL,
  descriptionModel TEXT(64) NOT NULL,
  startDate TIMESTAMP,
  earliestDate TIMESTAMP,
  dueDate TIMESTAMP,
  quantity INT,
  initial_sn TEXT(64) NOT NULL,
  final_sn TEXT(64) NOT NULL,
  productionLine_id INT,
  PRIMARY KEY (productionOrder_id),
  CONSTRAINT productionOrder_fk FOREIGN KEY (productionLine_id) REFERENCES ProductionLine(productionLine_id) ON DELETE SET NULL
);

-- ---------------------------------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS Journal (
  journal_id INT NOT NULL AUTO_INCREMENT,
  productionOrder_id BIGINT NOT NULL,
  industrialModel_id BIGINT NOT NULL,
  startDate DATE,
  endDate DATE,
  status TEXT(64) NOT NULL,
  productionLine_id INT,
  PRIMARY KEY (journal_id),
  CONSTRAINT journal_fk_1 FOREIGN KEY (productionOrder_id) REFERENCES ProductionOrder(productionOrder_id) ON DELETE CASCADE,
  CONSTRAINT journal_fk_2 FOREIGN KEY (productionLine_id) REFERENCES ProductionLine(productionLine_id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS Station (
  station_id INT NOT NULL AUTO_INCREMENT,
  description TEXT(64),
  note TEXT(128),
  PRIMARY KEY (station_id)
);
CREATE TABLE IF NOT EXISTS JournalDetails (
  journalDetails_id INT NOT NULL AUTO_INCREMENT,
  journal_id INT NOT NULL,
  description TEXT(64),
  overallResult TEXT(64) NOT NULL,
  dateTime DATETIME(3) NOT NULL,
  overallDefectCode TEXT(16),
  station_id INT NOT NULL,
  PRIMARY KEY (journalDetails_id),
  CONSTRAINT journalDetails_fk_1 FOREIGN KEY (journal_id) REFERENCES Journal(journal_id) ON DELETE CASCADE,
  CONSTRAINT journalDetails_fk_2 FOREIGN KEY (station_id) REFERENCES Station(station_id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS Product (
  product_id BIGINT NOT NULL AUTO_INCREMENT,
  productionOrder_id BIGINT NOT NULL,
  engineeringBoM_id BIGINT, 
  industrialModel_id BIGINT,
  commercialModel_id BIGINT,
  descriptionModel TEXT(64),
  PRIMARY KEY (product_id),
  CONSTRAINT product_fk_1 FOREIGN KEY (productionOrder_id) REFERENCES ProductionOrder(productionOrder_id) ON DELETE CASCADE,
  CONSTRAINT product_fk_2 FOREIGN KEY (engineeringBoM_id) REFERENCES EngineeringBoM(engineeringBoM_id) ON DELETE SET NULL
);

-- ---------------------------------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS Operation (
  operation_id INT NOT NULL AUTO_INCREMENT,
  description TEXT(64),
  note TEXT(255) DEFAULT NULL,
  materialUsedAsCarrier_id BIGINT,
  materialUsedAsTarget_id BIGINT,
  materialTransformation_id BIGINT,
  PRIMARY KEY (operation_id),
  CONSTRAINT operation_fk_1 FOREIGN KEY (materialUsedAsCarrier_id) REFERENCES Material(material_id) ON DELETE CASCADE,
  CONSTRAINT operation_fk_2 FOREIGN KEY (materialUsedAsTarget_id) REFERENCES Material(material_id) ON DELETE CASCADE,
  CONSTRAINT operation_fk_3 FOREIGN KEY (materialTransformation_id) REFERENCES Material(material_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS JournalDetails_Operation (
  journalDetails_id INT NOT NULL,
  operation_id INT NOT NULL,
  PRIMARY KEY (journalDetails_id, operation_id),
  CONSTRAINT journalDetails_operation_fk_1 FOREIGN KEY (journalDetails_id) REFERENCES JournalDetails(journalDetails_id) ON DELETE CASCADE,
  CONSTRAINT journalDetails_operation_fk_2 FOREIGN KEY (operation_id) REFERENCES Operation(operation_id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ResourceType (
 resourceType_id INT NOT NULL AUTO_INCREMENT,
 description TEXT(64),
 PRIMARY KEY (resourceType_id)
);
CREATE TABLE IF NOT EXISTS ResourceSetup (
 resourceSetup_id INT NOT NULL AUTO_INCREMENT,
 description TEXT(64),
 PRIMARY KEY (resourceSetup_id)
);
CREATE TABLE IF NOT EXISTS Resource (
  resource_id INT NOT NULL AUTO_INCREMENT,
  productionLine_id INT,
  description TEXT(64),
  resourceType_id INT,
  PRIMARY KEY (resource_id),
  CONSTRAINT resource_fk_1 FOREIGN KEY (productionLine_id) REFERENCES ProductionLine(productionLine_id) ON DELETE SET NULL,
  CONSTRAINT resource_fk_2 FOREIGN KEY (resourceType_id) REFERENCES ResourceType(resourceType_id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS Resource_Measure (
  resource_id INT NOT NULL,
  measure_id INT NOT NULL,
  PRIMARY KEY (resource_id, measure_id),
  CONSTRAINT resource_measure_fk_1 FOREIGN KEY (resource_id) REFERENCES Resource(resource_id) ON DELETE CASCADE,
  CONSTRAINT resource_measure_fk_2 FOREIGN KEY (measure_id) REFERENCES Measure(measure_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS Resource_ResourceSetup (
  resource_id INT NOT NULL,
  resourceSetup_id INT NOT NULL,
  PRIMARY KEY (resource_id, resourceSetup_id),
  CONSTRAINT resource_resourceSetup_fk_1 FOREIGN KEY (resource_id) REFERENCES Resource(resource_id) ON DELETE CASCADE,
  CONSTRAINT resource_resourceSetup_fk_2 FOREIGN KEY (resourceSetup_id) REFERENCES ResourceSetup(resourceSetup_id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ResourceFailure (
  resourceFailure_id INT NOT NULL AUTO_INCREMENT,
  description TEXT(64),
  occuranceDate DATETIME(3),
  failureType_id INT,
  PRIMARY KEY (resourceFailure_id),
  CONSTRAINT resourceFailure_fk FOREIGN KEY (failureType_id) REFERENCES FailureType(failureType_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS Resource_ResourceFailure (
  resource_id INT NOT NULL,
  resourceFailure_id INT NOT NULL,
  PRIMARY KEY (resource_id, resourceFailure_id),
  CONSTRAINT resource_resourceFailure_fk_1 FOREIGN KEY (resource_id) REFERENCES Resource(resource_id) ON DELETE CASCADE,
  CONSTRAINT resource_resourceFailure_fk_2 FOREIGN KEY (resourceFailure_id) REFERENCES ResourceFailure(resourceFailure_id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS Location (
  location_id INT NOT NULL AUTO_INCREMENT,
  description TEXT(64),
  PRIMARY KEY (location_id)
);
CREATE TABLE IF NOT EXISTS State (
  state_id INT NOT NULL AUTO_INCREMENT,
  description TEXT(64),
  PRIMARY KEY (state_id)
);
CREATE TABLE IF NOT EXISTS ProcessType (
 processType_id INT NOT NULL AUTO_INCREMENT,
 description TEXT(64),
 PRIMARY KEY (processType_id)
);
CREATE TABLE IF NOT EXISTS Process (
  process_id INT NOT NULL AUTO_INCREMENT,
  location_id INT,
  state_id INT,
  operation_id INT,
  resource_id INT,
  processType_id INT,
  duration INT(64),
  description TEXT(64),
  PRIMARY KEY (process_id),
  CONSTRAINT process_fk_1 FOREIGN KEY (location_id) REFERENCES Location(location_id) ON DELETE SET NULL,
  CONSTRAINT process_fk_2 FOREIGN KEY (state_id) REFERENCES State(state_id) ON DELETE SET NULL,
  CONSTRAINT process_fk_3 FOREIGN KEY (operation_id) REFERENCES Operation(operation_id) ON DELETE SET NULL,
  CONSTRAINT process_fk_4 FOREIGN KEY (resource_id) REFERENCES Resource(resource_id) ON DELETE SET NULL,
  CONSTRAINT process_fk_5 FOREIGN KEY (processType_id) REFERENCES ProcessType(processType_id) ON DELETE SET NULL
);

-- ---------------------------------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ProcessFailure (
  processFailure_id INT NOT NULL AUTO_INCREMENT,
  description TEXT(64),
  recoveryTime INT,
  occuranceDate DATETIME(3),
  failureType_id INT,
  PRIMARY KEY (processFailure_id),
  CONSTRAINT processFailure_fk FOREIGN KEY (failureType_id) REFERENCES FailureType(failureType_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS Process_ProcessFailure (
  process_id INT NOT NULL,
  processFailure_id INT NOT NULL,
  PRIMARY KEY (process_id, processFailure_id),
  CONSTRAINT process_processFailure_fk_1 FOREIGN KEY (process_id) REFERENCES Process(process_id) ON DELETE CASCADE,
  CONSTRAINT process_processFailure_fk_2 FOREIGN KEY (processFailure_id) REFERENCES ProcessFailure(processFailure_id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS Function (
  function_id INT NOT NULL AUTO_INCREMENT,
  process_id INT,
  description TEXT(32),
  materialUsedAsCarrier_id BIGINT NOT NULL,
  carrier TEXT(32) NOT NULL,
  function TEXT(32) NOT NULL,
  materialUsedAsObject_id BIGINT NOT NULL,
  object TEXT(32) NOT NULL,
  PRIMARY KEY (function_id),
  CONSTRAINT function_fk_1 FOREIGN KEY (materialUsedAsCarrier_id) REFERENCES Material(material_id) ON DELETE CASCADE,
  CONSTRAINT function_fk_2 FOREIGN KEY (materialUsedAsObject_id) REFERENCES Material(material_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS Function_Measure (
  function_id INT NOT NULL,
  measure_id INT NOT NULL,
  PRIMARY KEY (function_id, measure_id),
  CONSTRAINT function_measure_fk_1 FOREIGN KEY (function_id) REFERENCES Function(function_id) ON DELETE CASCADE,
  CONSTRAINT function_measure_fk_2 FOREIGN KEY (measure_id) REFERENCES Measure(measure_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS Process_Function (
  process_id INT NOT NULL,
  function_id INT NOT NULL,
  PRIMARY KEY (process_id, function_id),
  CONSTRAINT process_function_fk_1 FOREIGN KEY (process_id) REFERENCES Process(process_id) ON DELETE CASCADE,
  CONSTRAINT process_function_fk_2 FOREIGN KEY (function_id) REFERENCES Function(function_id) ON DELETE CASCADE
);
-- ---------------------------------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS MaterialQA (
  materialQA_id INT NOT NULL AUTO_INCREMENT,
  used INT NOT NULL DEFAULT 1, # 0 not used, 1 used
  material_id BIGINT NOT NULL,
  qa1_drying_performance DECIMAL(3,1) NOT NULL DEFAULT 0.0,
  qa2_noise DECIMAL(3,1) NOT NULL DEFAULT 0.0,
  qa3_energy_consumption DECIMAL(3,1) NOT NULL DEFAULT 0.0,
  qa4_component_failure DECIMAL(3,1) NOT NULL DEFAULT 0.0,
  qa5_perceived_quality DECIMAL(3,1) NOT NULL DEFAULT 0.0,
  PRIMARY KEY (materialQA_id),
  CONSTRAINT materialQA_fk FOREIGN KEY (material_id) REFERENCES Material(material_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS FunctionQA (
  functionQA_id INT NOT NULL AUTO_INCREMENT,
  used INT NOT NULL DEFAULT 1, # 0 not used, 1 used
  function_id INT NOT NULL,
  qa1_drying_performance DECIMAL(3,1) NOT NULL DEFAULT 0.0,
  qa2_noise DECIMAL(3,1) NOT NULL DEFAULT 0.0,
  qa3_energy_consumption DECIMAL(3,1) NOT NULL DEFAULT 0.0,
  qa4_component_failure DECIMAL(3,1) NOT NULL DEFAULT 0.0,
  qa5_perceived_quality DECIMAL(3,1) NOT NULL DEFAULT 0.0,
  PRIMARY KEY (functionQA_id),
  CONSTRAINT functionQA_fk FOREIGN KEY (function_id) REFERENCES Function(function_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ProcessQA (
  ProcessQA_id INT NOT NULL AUTO_INCREMENT,
  used INT NOT NULL DEFAULT 1, # 0 not used, 1 used
  process_id INT NOT NULL,
  qa1_drying_performance DECIMAL(3,1) NOT NULL DEFAULT 0.0,
  qa2_noise DECIMAL(3,1) NOT NULL DEFAULT 0.0,
  qa3_energy_consumption DECIMAL(3,1) NOT NULL DEFAULT 0.0,
  qa4_component_failure DECIMAL(3,1) NOT NULL DEFAULT 0.0,
  qa5_perceived_quality DECIMAL(3,1) NOT NULL DEFAULT 0.0,
  PRIMARY KEY (ProcessQA_id),
  CONSTRAINT processQA_fk FOREIGN KEY (process_id) REFERENCES Process(process_id) ON DELETE CASCADE
);