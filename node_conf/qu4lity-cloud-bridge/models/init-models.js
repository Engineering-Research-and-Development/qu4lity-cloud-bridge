var DataTypes = require("sequelize").DataTypes;
var _EngineeringBoM = require("./EngineeringBoM");
var _EngineeringBoM_Material = require("./EngineeringBoM_Material");
var _FailureType = require("./FailureType");
var _Function = require("./Function");
var _Function_Measure = require("./Function_Measure");
var _Journal = require("./Journal");
var _JournalDetails = require("./JournalDetails");
var _Location = require("./Location");
var _Material = require("./Material");
var _MaterialFamily = require("./MaterialFamily");
var _Material_Measure = require("./Material_Measure");
var _Material_Property = require("./Material_Property");
var _Measure = require("./Measure");
var _MeasureFailure = require("./MeasureFailure");
var _Operation = require("./Operation");
var _OperationFailure = require("./OperationFailure");
var _Operation_OperationFailure = require("./Operation_OperationFailure");
var _Process = require("./Process");
var _ProcessFailure = require("./ProcessFailure");
var _ProcessType = require("./ProcessType");
var _Process_Measure = require("./Process_Measure");
var _Product = require("./Product");
var _Product_Material = require("./Product_Material");
var _ProductionLine = require("./ProductionLine");
var _ProductionOrder = require("./ProductionOrder");
var _Property = require("./Property");
var _RecoveryProcedure = require("./RecoveryProcedure");
var _State = require("./State");
var _Station = require("./Station");

function initModels(sequelize) {
  var EngineeringBoM = _EngineeringBoM(sequelize, DataTypes);
  var EngineeringBoM_Material = _EngineeringBoM_Material(sequelize, DataTypes);
  var FailureType = _FailureType(sequelize, DataTypes);
  var Function = _Function(sequelize, DataTypes);
  var Function_Measure = _Function_Measure(sequelize, DataTypes);
  var Journal = _Journal(sequelize, DataTypes);
  var JournalDetails = _JournalDetails(sequelize, DataTypes);
  var Location = _Location(sequelize, DataTypes);
  var Material = _Material(sequelize, DataTypes);
  var MaterialFamily = _MaterialFamily(sequelize, DataTypes);
  var Material_Measure = _Material_Measure(sequelize, DataTypes);
  var Material_Property = _Material_Property(sequelize, DataTypes);
  var Measure = _Measure(sequelize, DataTypes);
  var MeasureFailure = _MeasureFailure(sequelize, DataTypes);
  var Operation = _Operation(sequelize, DataTypes);
  var OperationFailure = _OperationFailure(sequelize, DataTypes);
  var Operation_OperationFailure = _Operation_OperationFailure(sequelize, DataTypes);
  var Process = _Process(sequelize, DataTypes);
  var ProcessFailure = _ProcessFailure(sequelize, DataTypes);
  var ProcessType = _ProcessType(sequelize, DataTypes);
  var Process_Measure = _Process_Measure(sequelize, DataTypes);
  var Product = _Product(sequelize, DataTypes);
  var Product_Material = _Product_Material(sequelize, DataTypes);
  var ProductionLine = _ProductionLine(sequelize, DataTypes);
  var ProductionOrder = _ProductionOrder(sequelize, DataTypes);
  var Property = _Property(sequelize, DataTypes);
  var RecoveryProcedure = _RecoveryProcedure(sequelize, DataTypes);
  var State = _State(sequelize, DataTypes);
  var Station = _Station(sequelize, DataTypes);

  Material.belongsToMany(EngineeringBoM, { through: EngineeringBoM_Material, foreignKey: "material_id", otherKey: "engineeringBoM_id" });
  EngineeringBoM.belongsToMany(Material, { through: EngineeringBoM_Material, foreignKey: "engineeringBoM_id", otherKey: "material_id" });
  Measure.belongsToMany(Function, { through: Function_Measure, foreignKey: "measure_id", otherKey: "function_id" });
  Function.belongsToMany(Measure, { through: Function_Measure, foreignKey: "function_id", otherKey: "measure_id" });
  Measure.belongsToMany(Material, { through: Material_Measure, foreignKey: "measure_id", otherKey: "material_id" });
  Material.belongsToMany(Measure, { through: Material_Measure, foreignKey: "material_id", otherKey: "measure_id" });
  Property.belongsToMany(Material, { through: Material_Property, foreignKey: "property_id", otherKey: "material_id" });
  Material.belongsToMany(Property, { through: Material_Property, foreignKey: "material_id", otherKey: "property_id" });
  OperationFailure.belongsToMany(Operation, { through: Operation_OperationFailure, foreignKey: "operationFailure_id", otherKey: "operation_id" });
  Operation.belongsToMany(OperationFailure, { through: Operation_OperationFailure, foreignKey: "operation_id", otherKey: "operationFailure_id" });
  Measure.belongsToMany(Process, { through: Process_Measure, foreignKey: "measure_id", otherKey: "process_id" });
  Process.belongsToMany(Measure, { through: Process_Measure, foreignKey: "process_id", otherKey: "measure_id" });
  Material.belongsToMany(Product, { through: Product_Material, foreignKey: "material_id", otherKey: "product_id" });
  Product.belongsToMany(Material, { through: Product_Material, foreignKey: "product_id", otherKey: "material_id" });
  EngineeringBoM_Material.belongsTo(EngineeringBoM, { foreignKey: "engineeringBoM_id"});
  EngineeringBoM.hasMany(EngineeringBoM_Material, { foreignKey: "engineeringBoM_id"});
  EngineeringBoM_Material.belongsTo(Material, { foreignKey: "material_id"});
  Material.hasMany(EngineeringBoM_Material, { foreignKey: "material_id"});
  Function.belongsTo(Process, { foreignKey: "process_id"});
  Process.hasMany(Function, { foreignKey: "process_id"});
  Function.belongsTo(EngineeringBoM, { foreignKey: "materialUsedAsCarrier_id"});
  EngineeringBoM.hasMany(Function, { foreignKey: "materialUsedAsCarrier_id"});
  Function.belongsTo(EngineeringBoM, { foreignKey: "materialUsedAsObject_id"});
  EngineeringBoM.hasMany(Function, { foreignKey: "materialUsedAsObject_id"});
  Function_Measure.belongsTo(Function, { foreignKey: "function_id"});
  Function.hasMany(Function_Measure, { foreignKey: "function_id"});
  Function_Measure.belongsTo(Measure, { foreignKey: "measure_id"});
  Measure.hasMany(Function_Measure, { foreignKey: "measure_id"});
  Journal.belongsTo(ProductionOrder, { foreignKey: "productionOrder_id"});
  ProductionOrder.hasMany(Journal, { foreignKey: "productionOrder_id"});
  Journal.belongsTo(ProductionLine, { foreignKey: "productionLine_id"});
  ProductionLine.hasMany(Journal, { foreignKey: "productionLine_id"});
  JournalDetails.belongsTo(Journal, { foreignKey: "journal_id"});
  Journal.hasMany(JournalDetails, { foreignKey: "journal_id"});
  JournalDetails.belongsTo(Station, { foreignKey: "station_id"});
  Station.hasMany(JournalDetails, { foreignKey: "station_id"});
  Material.belongsTo(MaterialFamily, { foreignKey: "materialFamily_id"});
  MaterialFamily.hasMany(Material, { foreignKey: "materialFamily_id"});
  Material_Measure.belongsTo(Material, { foreignKey: "material_id"});
  Material.hasMany(Material_Measure, { foreignKey: "material_id"});
  Material_Measure.belongsTo(Measure, { foreignKey: "measure_id"});
  Measure.hasMany(Material_Measure, { foreignKey: "measure_id"});
  Material_Property.belongsTo(Material, { foreignKey: "material_id"});
  Material.hasMany(Material_Property, { foreignKey: "material_id"});
  Material_Property.belongsTo(Property, { foreignKey: "property_id"});
  Property.hasMany(Material_Property, { foreignKey: "property_id"});
  MeasureFailure.belongsTo(Measure, { foreignKey: "measure_id"});
  Measure.hasMany(MeasureFailure, { foreignKey: "measure_id"});
  MeasureFailure.belongsTo(FailureType, { foreignKey: "failureType_id"});
  FailureType.hasMany(MeasureFailure, { foreignKey: "failureType_id"});
  Operation.belongsTo(Material, { foreignKey: "materialUsedAsCarrier_id"});
  Material.hasMany(Operation, { foreignKey: "materialUsedAsCarrier_id"});
  Operation.belongsTo(Material, { foreignKey: "materialUsedAsTarget_id"});
  Material.hasMany(Operation, { foreignKey: "materialUsedAsTarget_id"});
  Operation.belongsTo(Material, { foreignKey: "materialTransformation_id"});
  Material.hasMany(Operation, { foreignKey: "materialTransformation_id"});
  OperationFailure.belongsTo(FailureType, { foreignKey: "failureType_id"});
  FailureType.hasMany(OperationFailure, { foreignKey: "failureType_id"});
  Operation_OperationFailure.belongsTo(Operation, { foreignKey: "operation_id"});
  Operation.hasMany(Operation_OperationFailure, { foreignKey: "operation_id"});
  Operation_OperationFailure.belongsTo(OperationFailure, { foreignKey: "operationFailure_id"});
  OperationFailure.hasMany(Operation_OperationFailure, { foreignKey: "operationFailure_id"});
  Process.belongsTo(Location, { foreignKey: "location_id"});
  Location.hasMany(Process, { foreignKey: "location_id"});
  Process.belongsTo(State, { foreignKey: "state_id"});
  State.hasMany(Process, { foreignKey: "state_id"});
  Process.belongsTo(Operation, { foreignKey: "operation_id"});
  Operation.hasMany(Process, { foreignKey: "operation_id"});
  Process.belongsTo(ProcessType, { foreignKey: "processType_id"});
  ProcessType.hasMany(Process, { foreignKey: "processType_id"});
  ProcessFailure.belongsTo(Process, { foreignKey: "process_id"});
  Process.hasMany(ProcessFailure, { foreignKey: "process_id"});
  ProcessFailure.belongsTo(FailureType, { foreignKey: "failureType_id"});
  FailureType.hasMany(ProcessFailure, { foreignKey: "failureType_id"});
  Process_Measure.belongsTo(Process, { foreignKey: "process_id"});
  Process.hasMany(Process_Measure, { foreignKey: "process_id"});
  Process_Measure.belongsTo(Measure, { foreignKey: "measure_id"});
  Measure.hasMany(Process_Measure, { foreignKey: "measure_id"});
  Product.belongsTo(ProductionOrder, { foreignKey: "productionOrder_id"});
  ProductionOrder.hasMany(Product, { foreignKey: "productionOrder_id"});
  Product.belongsTo(EngineeringBoM, { foreignKey: "engineeringBoM_id"});
  EngineeringBoM.hasMany(Product, { foreignKey: "engineeringBoM_id"});
  Product_Material.belongsTo(Product, { foreignKey: "product_id"});
  Product.hasMany(Product_Material, { foreignKey: "product_id"});
  Product_Material.belongsTo(Material, { foreignKey: "material_id"});
  Material.hasMany(Product_Material, { foreignKey: "material_id"});
  ProductionOrder.belongsTo(ProductionLine, { foreignKey: "productionLine_id"});
  ProductionLine.hasMany(ProductionOrder, { foreignKey: "productionLine_id"});
  RecoveryProcedure.belongsTo(FailureType, { foreignKey: "failureType_id"});
  FailureType.hasMany(RecoveryProcedure, { foreignKey: "failureType_id"});

  return {
    EngineeringBoM,
    EngineeringBoM_Material,
    FailureType,
    Function,
    Function_Measure,
    Journal,
    JournalDetails,
    Location,
    Material,
    MaterialFamily,
    Material_Measure,
    Material_Property,
    Measure,
    MeasureFailure,
    Operation,
    OperationFailure,
    Operation_OperationFailure,
    Process,
    ProcessFailure,
    ProcessType,
    Process_Measure,
    Product,
    Product_Material,
    ProductionLine,
    ProductionOrder,
    Property,
    RecoveryProcedure,
    State,
    Station,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
