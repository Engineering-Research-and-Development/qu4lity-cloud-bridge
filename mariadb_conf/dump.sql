CREATE DATABASE IF NOT EXISTS whr_mpfq_relational;

USE whr_mpfq_relational;

CREATE TABLE IF NOT EXISTS ProductionLine
( productionLine_id INT NOT NULL AUTO_INCREMENT,
  name TEXT(32) NOT NULL,
  description TEXT(64) NOT NULL,
  PRIMARY KEY (productionLine_id)
);
INSERT INTO ProductionLine (productionLine_id, name, description) VALUES (1,"Assembly Line",""),(2,"Drum Line",""),(3,"Heat Pump Line",""),(4,"AirFlow Line",""),(5,"Door Assembly line","");

CREATE TABLE IF NOT EXISTS ProductionOrder
( productionOrder_id INT NOT NULL AUTO_INCREMENT,
  industrialModel_id INT NOT NULL, 
  commercialModel_id INT NOT NULL,
  descriptionModel_id INT NOT NULL,
  startDate DATE NOT NULL,
  earliestDate DATE NOT NULL,
  dueDate DATE NOT NULL,
  quantity INT NOT NULL,
  initial_sn TEXT(64) NOT NULL, 
  final_sn TEXT(64) NOT NULL,
  productionAssemblyLine_id INT NOT NULL DEFAULT '0',
  PRIMARY KEY (productionOrder_id),
  CONSTRAINT productionOrder_fk FOREIGN KEY (productionAssemblyLine_id) REFERENCES ProductionLine(productionLine_id) ON DELETE SET DEFAULT
);
INSERT INTO ProductionOrder (productionOrder_id, industrialModel_id, commercialModel_id, descriptionModel_id, startDate, earliestDate, dueDate, quantity, initial_sn, final_sn, productionAssemblyLine_id ) VALUES (1,1,1,1,"2020-09-18","2020-09-20","2020-09-30",500,"551846001586","552003003951",1);

CREATE TABLE IF NOT EXISTS SubUnit
( subUnit_id INT NOT NULL AUTO_INCREMENT,
  description TEXT(64) NOT NULL, 
  PRIMARY KEY (subUnit_id)
  );
  INSERT INTO SubUnit (subUnit_id, description) VALUES (1, "AirFlow"), (2, "Heat Pump"), (3, "Hydraulic"), (4, "Mechanical"), (5, "Chassis"), (6, "Electrical");

CREATE TABLE IF NOT EXISTS Material
( material_id BIGINT NOT NULL AUTO_INCREMENT,
  description TEXT(64) NOT NULL,
  type TEXT(32) NOT NULL,
  quantity INT NOT NULL,
  name TEXT(32) NOT NULL,
  materialModel TEXT(32) NOT NULL,
  materialFunctionUse INT NOT NULL,
  subUnit_id INT NOT NULL DEFAULT '0',
  PRIMARY KEY (material_id),
  CONSTRAINT material_fk FOREIGN KEY (subUnit_id) REFERENCES SubUnit(subUnit_id) ON DELETE SET DEFAULT
);
INSERT INTO Material (material_id, description, type, quantity, name, materialModel, materialFunctionUse, subUnit_id) VALUES ("552003000000","MaterialCarrier","Just a Test",500, "MC01", "MT-MD1", 1, 4);
INSERT INTO Material (material_id, description, type, quantity, name, materialModel, materialFunctionUse, subUnit_id) VALUES ("552003000001","MaterialTarget","Just a Test",500,"MT01", "MT-MD1", 2, 1);
INSERT INTO Material (material_id, description, type, quantity, name, materialModel, materialFunctionUse, subUnit_id) VALUES ("552003000002","MaterialTransform","Just a Test",500, "MTT01", "MTT-MD1", 3, 4);

CREATE TABLE IF NOT EXISTS Product
( product_id BIGINT NOT NULL AUTO_INCREMENT,
  productionOrder_id INT NOT NULL,
  name TEXT(32) NOT NULL,
  description TEXT(64),
  PRIMARY KEY (product_id),
  CONSTRAINT product_fk_1 FOREIGN KEY (productionOrder_id) REFERENCES ProductionOrder(productionOrder_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Product_Material
( product_id BIGINT NOT NULL,
  material_id BIGINT NOT NULL,
  PRIMARY KEY (product_id, material_id),
  CONSTRAINT product_material_fk_1 FOREIGN KEY (product_id) REFERENCES Product(product_id) ON DELETE CASCADE,
  CONSTRAINT product_material_fk_2 FOREIGN KEY (material_id) REFERENCES Material(material_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ProductionOrder_Product
( productionOrder_id INT NOT NULL,
  product_id BIGINT NOT NULL,
  PRIMARY KEY (productionOrder_id, product_id),
  CONSTRAINT productionOrder_product_fk_1 FOREIGN KEY (productionOrder_id) REFERENCES ProductionOrder(productionOrder_id) ON DELETE CASCADE,
  CONSTRAINT productionOrder_product_fk_2 FOREIGN KEY (product_id) REFERENCES Product(product_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Measure
( measure_id INT NOT NULL AUTO_INCREMENT,
  description TEXT(64) NOT NULL,
  type TEXT(16) NOT NULL,
  measureDimension TEXT(16) NOT NULL,
  dateTime DATETIME NOT NULL,
  PRIMARY KEY (measure_id)
);

CREATE TABLE IF NOT EXISTS Specification
( specification_id INT NOT NULL AUTO_INCREMENT,
  measure_id INT NOT NULL,
  dataSeriesUSL TEXT(64),
  dataSeriesLSL TEXT(64),
  usl TEXT(16),
  lsl TEXT(16),
  description TEXT(64) NOT NULL,
  type TEXT(16) NOT NULL,
  PRIMARY KEY (specification_id),
  CONSTRAINT specification_fk FOREIGN KEY (measure_id) REFERENCES Measure(measure_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS FailureType
( failureType_id INT NOT NULL AUTO_INCREMENT,
  description TEXT(64) NOT NULL,
  setOfSymptoms TEXT(64) NOT NULL,
  type TEXT(32) NOT NULL,
  name TEXT(32) NOT NULL,
  PRIMARY KEY (failureType_id)
);
INSERT INTO FailureType (description, setOfSymptoms, type, name) VALUES ("Generic failure", "Broken production pipeline", "ERR", "Generic_Error");

CREATE TABLE IF NOT EXISTS RecoveryProcedure
( recoveryProcedure_id INT NOT NULL AUTO_INCREMENT,
  failureType_id INT NOT NULL,
  name TEXT(32) NOT NULL,
  PRIMARY KEY (recoveryProcedure_id),
  CONSTRAINT recoveryProcedure_fk_1 FOREIGN KEY (failureType_id) REFERENCES FailureType(failureType_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS MeasureKO
( measureKO_id INT NOT NULL AUTO_INCREMENT,
  measure_id INT NOT NULL,
  failureType_id INT NOT NULL,
  product_id BIGINT NOT NULL,
  dateTime DATETIME NOT NULL,
  recoveryTime INT NOT NULL,
  description TEXT(64) NOT NULL,
  PRIMARY KEY (measureKO_id),
  CONSTRAINT measureKO_fk_1 FOREIGN KEY (measure_id) REFERENCES Measure(measure_id) ON DELETE CASCADE,
  CONSTRAINT measureKO_fk_2 FOREIGN KEY (failureType_id) REFERENCES FailureType(failureType_id) ON DELETE CASCADE,
  CONSTRAINT measureKO_fk_3 FOREIGN KEY (product_id) REFERENCES Product(product_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS MeasureValues
( values_id INT NOT NULL AUTO_INCREMENT,
  measure_id INT NOT NULL,
  m_values TEXT(256) NOT NULL,
  PRIMARY KEY (values_id),
  CONSTRAINT values_fk FOREIGN KEY (measure_id) REFERENCES Measure(measure_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Material_Measure
( material_id BIGINT NOT NULL,
  measure_id INT NOT NULL,
  PRIMARY KEY (material_id, measure_id),
  CONSTRAINT material_Measure_fk_1 FOREIGN KEY (material_id) REFERENCES Material(material_id) ON DELETE CASCADE,
  CONSTRAINT material_Measure_fk_2 FOREIGN KEY (measure_id) REFERENCES Measure(measure_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS MaterialFamily
( materialFamily_id BIGINT NOT NULL,
  description TEXT(64) NOT NULL,
  name TEXT(32) NOT NULL,
  PRIMARY KEY (materialFamily_id)
);

CREATE TABLE IF NOT EXISTS Material_MaterialFamily
( material_id BIGINT NOT NULL,
  materialFamily_id BIGINT NOT NULL,
  PRIMARY KEY (material_id, materialFamily_id),
  CONSTRAINT material_materialFamily_fk_1 FOREIGN KEY (material_id) REFERENCES Material(material_id) ON DELETE CASCADE,
  CONSTRAINT material_materialFamily_fk_2 FOREIGN KEY (materialFamily_id) REFERENCES MaterialFamily(materialFamily_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Material_Material
( material_id BIGINT NOT NULL,
  subMaterial_id BIGINT NOT NULL,
  PRIMARY KEY (material_id, subMaterial_id),
  CONSTRAINT materialComposition_fk_1 FOREIGN KEY (material_id) REFERENCES Material(material_id) ON DELETE CASCADE,
  CONSTRAINT materialComposition_fk_2 FOREIGN KEY (subMaterial_id) REFERENCES Material(material_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Property
( property_id INT NOT NULL AUTO_INCREMENT,
  name TEXT(32) NOT NULL,
  description TEXT(64) NOT NULL, 
  property1 TEXT(64),
  property2 TEXT(64),
  property3 TEXT(64),
  PRIMARY KEY (property_id)
);

CREATE TABLE IF NOT EXISTS Material_Property
( material_id BIGINT NOT NULL,
  property_id INT NOT NULL,
  PRIMARY KEY (material_id, property_id),
  CONSTRAINT material_property_fk_1 FOREIGN KEY (material_id) REFERENCES Material(material_id) ON DELETE CASCADE,
  CONSTRAINT material_property_fk_2 FOREIGN KEY (property_id) REFERENCES Property(property_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Setup
( setup_id INT NOT NULL AUTO_INCREMENT,
  description TEXT(64) NOT NULL,
  PRIMARY KEY (setup_id)
);
INSERT INTO Setup (description) VALUES ("Generic Setup");

CREATE TABLE IF NOT EXISTS Resource
( resource_id INT NOT NULL AUTO_INCREMENT,
  setup_id INT NOT NULL,
  location TEXT(64) NOT NULL,
  name TEXT(32) NOT NULL,
  type TEXT(32) NOT NULL,
  state TEXT(32) NOT NULL,
  PRIMARY KEY (resource_id),
  CONSTRAINT resource_fk FOREIGN KEY (setup_id) REFERENCES Setup(setup_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS OperationFailure
( operationFailure_id INT NOT NULL AUTO_INCREMENT,
  failureType_id INT NOT NULL,
  recoveryTime INT NOT NULL,
  occuranceDate DATETIME NOT NULL, 
  description TEXT(64) NOT NULL,
  PRIMARY KEY (operationFailure_id),
  CONSTRAINT operationFailure_fk FOREIGN KEY (failureType_id) REFERENCES FailureType(failureType_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Resource_OperationFailure
( resource_id INT NOT NULL,
  operationFailure_id INT NOT NULL,
  PRIMARY KEY (resource_id, operationFailure_id),
  CONSTRAINT resource_operationFailure_fk_1 FOREIGN KEY (resource_id) REFERENCES Resource(resource_id) ON DELETE CASCADE,
  CONSTRAINT resource_operationFailure_fk_2 FOREIGN KEY (operationFailure_id) REFERENCES OperationFailure(operationFailure_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ResourceFailure
( resourceFailure_id INT NOT NULL AUTO_INCREMENT,
  failureType_id INT NOT NULL,
  recoveryTime INT NOT NULL,
  occuranceDate DATETIME NOT NULL, 
  description TEXT(64) NOT NULL,
  PRIMARY KEY (resourceFailure_id),
  CONSTRAINT resourceFailure_fk FOREIGN KEY (failureType_id) REFERENCES FailureType(failureType_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Resource_ResourceFailure
( resource_id INT NOT NULL,
  resourceFailure_id INT NOT NULL,
  PRIMARY KEY (resource_id, resourceFailure_id),
  CONSTRAINT resource_resourceFailure_fk_1 FOREIGN KEY (resource_id) REFERENCES Resource(resource_id) ON DELETE CASCADE,
  CONSTRAINT resource_resourceFailure_fk_2 FOREIGN KEY (resourceFailure_id) REFERENCES ResourceFailure(resourceFailure_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Resource_Measure
( resource_id INT NOT NULL,
  measure_id INT NOT NULL,
  PRIMARY KEY (resource_id, measure_id),
  CONSTRAINT resource_measure_fk_1 FOREIGN KEY (resource_id) REFERENCES Resource(resource_id) ON DELETE CASCADE,
  CONSTRAINT resource_measure_fk_2 FOREIGN KEY (measure_id) REFERENCES Measure(measure_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Function
( function_id INT NOT NULL AUTO_INCREMENT,
  resource_id INT NOT NULL,
  name TEXT(32) NOT NULL,
  type TEXT(32) NOT NULL,
  PRIMARY KEY (function_id),
  CONSTRAINT function_fk FOREIGN KEY (resource_id) REFERENCES Resource(resource_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Function_Measure
( function_id INT NOT NULL,
  measure_id INT NOT NULL,
  PRIMARY KEY (function_id, measure_id),
  CONSTRAINT function_measure_fk_1 FOREIGN KEY (function_id) REFERENCES Function(function_id) ON DELETE CASCADE,
  CONSTRAINT function_measure_fk_2 FOREIGN KEY (measure_id) REFERENCES Measure(measure_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS OperationType
( operationType_id INT NOT NULL AUTO_INCREMENT,
  description TEXT(64) NOT NULL,
  PRIMARY KEY (operationType_id)
);
INSERT INTO OperationType (operationType_id, description) VALUES (1,"Assembly Manual"),(2,"Assembly SemiAutomatic"),(3,"Assembly Automatic"),(4,"Testing Manual"),(5,"Testing SemiAutomatic"),(6,"Testing Automatic");

CREATE TABLE IF NOT EXISTS Operation
( operation_id INT NOT NULL AUTO_INCREMENT,
  resource_id INT NOT NULL,
  description TEXT(64) NOT NULL,
  operationType_id INT NOT NULL,
  duration INT(64) NOT NULL,
  name TEXT(32) NOT NULL,
  dateTime DATETIME NOT NULL,
  product_id BIGINT NOT NULL, 
  PRIMARY KEY (operation_id),
  CONSTRAINT operation_fk_1 FOREIGN KEY (resource_id) REFERENCES Resource(resource_id) ON DELETE CASCADE,
  CONSTRAINT operation_fk_2 FOREIGN KEY (product_id) REFERENCES Product(product_id) ON DELETE CASCADE,
  CONSTRAINT operation_fk_3 FOREIGN KEY (operationType_id) REFERENCES OperationType(operationType_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Journal
( journal_id INT NOT NULL AUTO_INCREMENT,
  productionOrder_id INT NOT NULL,
  industrialModel_id INT NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  status TEXT(64) NOT NULL,
  PRIMARY KEY (journal_id),
  CONSTRAINT journal_fk FOREIGN KEY (productionOrder_id) REFERENCES ProductionOrder(productionOrder_id) ON DELETE CASCADE
);
INSERT INTO Journal (journal_id, productionOrder_id, industrialModel_id, startDate, endDate, status) VALUES (1,1,1,"2020-09-18","2020-09-20","OK");

CREATE TABLE IF NOT EXISTS JournalDetails
( journalDetails_id INT NOT NULL AUTO_INCREMENT,
  journal_id INT NOT NULL,
  overallResult TEXT(64) NOT NULL,
  dateTime DATETIME NOT NULL,
  product_id BIGINT NOT NULL,
  name TEXT(64) NOT NULL,
  station_id TEXT(64) NOT NULL,
  materialUsedAsCarrier_id BIGINT NOT NULL,
  materialUsedAsTarget_id BIGINT NOT NULL, 
  materialTransformation_id BIGINT NOT NULL,
  operation_id INT NOT NULL,
  productionLine_id INT NOT NULL,
  PRIMARY KEY (journalDetails_id),
  CONSTRAINT journalDetails_fk_1 FOREIGN KEY (journal_id) REFERENCES Journal(journal_id) ON DELETE CASCADE,
  CONSTRAINT journalDetails_fk_2 FOREIGN KEY (materialUsedAsCarrier_id) REFERENCES Material(material_id) ON DELETE CASCADE,
  CONSTRAINT journalDetails_fk_3 FOREIGN KEY (materialUsedAsTarget_id) REFERENCES Material(material_id) ON DELETE CASCADE,
  CONSTRAINT journalDetails_fk_4 FOREIGN KEY (materialTransformation_id) REFERENCES Material(material_id) ON DELETE CASCADE,
  CONSTRAINT journalDetails_fk_5 FOREIGN KEY (operation_id) REFERENCES Operation(operation_id) ON DELETE CASCADE,
  CONSTRAINT journalDetails_fk_6 FOREIGN KEY (productionLine_id) REFERENCES ProductionLine(productionLine_id) ON DELETE CASCADE,
  CONSTRAINT journalDetails_fk_7 FOREIGN KEY (product_id) REFERENCES Product(product_id) ON DELETE CASCADE
);
