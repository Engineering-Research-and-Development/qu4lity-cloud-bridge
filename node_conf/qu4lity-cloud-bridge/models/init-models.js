var DataTypes = require("sequelize").DataTypes;
var _EngineeringBoM = require("./EngineeringBoM");
var _EngineeringBoM_Material = require("./EngineeringBoM_Material");
var _FailureType = require("./FailureType");
var _Function = require("./Function");
var _FunctionQA = require("./FunctionQA");
var _Function_Measure = require("./Function_Measure");
var _Journal = require("./Journal");
var _JournalDetails = require("./JournalDetails");
var _JournalDetails_Operation = require("./JournalDetails_Operation");
var _Location = require("./Location");
var _Material = require("./Material");
var _MaterialFamily = require("./MaterialFamily");
var _MaterialQA = require("./MaterialQA");
var _Material_Measure = require("./Material_Measure");
var _Material_Property = require("./Material_Property");
var _Material_WhirlpoolMaterial = require("./Material_WhirlpoolMaterial");
var _Measure = require("./Measure");
var _MeasureFailure = require("./MeasureFailure");
var _Operation = require("./Operation");
var _Process = require("./Process");
var _ProcessFailure = require("./ProcessFailure");
var _ProcessQA = require("./ProcessQA");
var _ProcessType = require("./ProcessType");
var _Process_Function = require("./Process_Function");
var _Process_ProcessFailure = require("./Process_ProcessFailure");
var _Product = require("./Product");
var _ProductionLine = require("./ProductionLine");
var _ProductionOrder = require("./ProductionOrder");
var _Property = require("./Property");
var _RecoveryProcedure = require("./RecoveryProcedure");
var _Resource = require("./Resource");
var _ResourceFailure = require("./ResourceFailure");
var _ResourceSetup = require("./ResourceSetup");
var _ResourceType = require("./ResourceType");
var _Resource_Measure = require("./Resource_Measure");
var _Resource_ResourceFailure = require("./Resource_ResourceFailure");
var _Resource_ResourceSetup = require("./Resource_ResourceSetup");
var _State = require("./State");
var _Station = require("./Station");
var _WhirlpoolMaterial = require("./WhirlpoolMaterial");

function initModels(sequelize) {
  var EngineeringBoM = _EngineeringBoM(sequelize, DataTypes);
  var EngineeringBoM_Material = _EngineeringBoM_Material(sequelize, DataTypes);
  var FailureType = _FailureType(sequelize, DataTypes);
  var Function = _Function(sequelize, DataTypes);
  var FunctionQA = _FunctionQA(sequelize, DataTypes);
  var Function_Measure = _Function_Measure(sequelize, DataTypes);
  var Journal = _Journal(sequelize, DataTypes);
  var JournalDetails = _JournalDetails(sequelize, DataTypes);
  var JournalDetails_Operation = _JournalDetails_Operation(sequelize, DataTypes);
  var Location = _Location(sequelize, DataTypes);
  var Material = _Material(sequelize, DataTypes);
  var MaterialFamily = _MaterialFamily(sequelize, DataTypes);
  var MaterialQA = _MaterialQA(sequelize, DataTypes);
  var Material_Measure = _Material_Measure(sequelize, DataTypes);
  var Material_Property = _Material_Property(sequelize, DataTypes);
  var Material_WhirlpoolMaterial = _Material_WhirlpoolMaterial(sequelize, DataTypes);
  var Measure = _Measure(sequelize, DataTypes);
  var MeasureFailure = _MeasureFailure(sequelize, DataTypes);
  var Operation = _Operation(sequelize, DataTypes);
  var Process = _Process(sequelize, DataTypes);
  var ProcessFailure = _ProcessFailure(sequelize, DataTypes);
  var ProcessQA = _ProcessQA(sequelize, DataTypes);
  var ProcessType = _ProcessType(sequelize, DataTypes);
  var Process_Function = _Process_Function(sequelize, DataTypes);
  var Process_ProcessFailure = _Process_ProcessFailure(sequelize, DataTypes);
  var Product = _Product(sequelize, DataTypes);
  var ProductionLine = _ProductionLine(sequelize, DataTypes);
  var ProductionOrder = _ProductionOrder(sequelize, DataTypes);
  var Property = _Property(sequelize, DataTypes);
  var RecoveryProcedure = _RecoveryProcedure(sequelize, DataTypes);
  var Resource = _Resource(sequelize, DataTypes);
  var ResourceFailure = _ResourceFailure(sequelize, DataTypes);
  var ResourceSetup = _ResourceSetup(sequelize, DataTypes);
  var ResourceType = _ResourceType(sequelize, DataTypes);
  var Resource_Measure = _Resource_Measure(sequelize, DataTypes);
  var Resource_ResourceFailure = _Resource_ResourceFailure(sequelize, DataTypes);
  var Resource_ResourceSetup = _Resource_ResourceSetup(sequelize, DataTypes);
  var State = _State(sequelize, DataTypes);
  var Station = _Station(sequelize, DataTypes);
  var WhirlpoolMaterial = _WhirlpoolMaterial(sequelize, DataTypes);

  Material.belongsToMany(EngineeringBoM, { through: EngineeringBoM_Material, foreignKey: "material_id", otherKey: "engineeringBoM_id" });
  EngineeringBoM.belongsToMany(Material, { through: EngineeringBoM_Material, foreignKey: "engineeringBoM_id", otherKey: "material_id" });
  Measure.belongsToMany(Function, { through: Function_Measure, foreignKey: "measure_id", otherKey: "function_id" });
  Function.belongsToMany(Measure, { through: Function_Measure, foreignKey: "function_id", otherKey: "measure_id" });
  Operation.belongsToMany(JournalDetails, { through: JournalDetails_Operation, foreignKey: "operation_id", otherKey: "journalDetails_id" });
  JournalDetails.belongsToMany(Operation, { through: JournalDetails_Operation, foreignKey: "journalDetails_id", otherKey: "operation_id" });
  Measure.belongsToMany(Material, { through: Material_Measure, foreignKey: "measure_id", otherKey: "material_id" });
  Material.belongsToMany(Measure, { through: Material_Measure, foreignKey: "material_id", otherKey: "measure_id" });
  Property.belongsToMany(Material, { through: Material_Property, foreignKey: "property_id", otherKey: "material_id" });
  Material.belongsToMany(Property, { through: Material_Property, foreignKey: "material_id", otherKey: "property_id" });
  WhirlpoolMaterial.belongsToMany(Material, { through: Material_WhirlpoolMaterial, foreignKey: "whr_material_id", otherKey: "material_id" });
  Material.belongsToMany(WhirlpoolMaterial, { through: Material_WhirlpoolMaterial, foreignKey: "material_id", otherKey: "whr_material_id" });
  Function.belongsToMany(Process, { through: Process_Function, foreignKey: "function_id", otherKey: "process_id" });
  Process.belongsToMany(Function, { through: Process_Function, foreignKey: "process_id", otherKey: "function_id" });
  ProcessFailure.belongsToMany(Process, { through: Process_ProcessFailure, foreignKey: "processFailure_id", otherKey: "process_id" });
  Process.belongsToMany(ProcessFailure, { through: Process_ProcessFailure, foreignKey: "process_id", otherKey: "processFailure_id" });
  Measure.belongsToMany(Resource, { through: Resource_Measure, foreignKey: "measure_id", otherKey: "resource_id" });
  Resource.belongsToMany(Measure, { through: Resource_Measure, foreignKey: "resource_id", otherKey: "measure_id" });
  ResourceFailure.belongsToMany(Resource, { through: Resource_ResourceFailure, foreignKey: "resourceFailure_id", otherKey: "resource_id" });
  Resource.belongsToMany(ResourceFailure, { through: Resource_ResourceFailure, foreignKey: "resource_id", otherKey: "resourceFailure_id" });
  ResourceSetup.belongsToMany(Resource, { through: Resource_ResourceSetup, foreignKey: "resourceSetup_id", otherKey: "resource_id" });
  Resource.belongsToMany(ResourceSetup, { through: Resource_ResourceSetup, foreignKey: "resource_id", otherKey: "resourceSetup_id" });
  EngineeringBoM_Material.belongsTo(EngineeringBoM, { foreignKey: "engineeringBoM_id"});
  EngineeringBoM.hasMany(EngineeringBoM_Material, { foreignKey: "engineeringBoM_id"});
  EngineeringBoM_Material.belongsTo(Material, { foreignKey: "material_id"});
  Material.hasMany(EngineeringBoM_Material, { foreignKey: "material_id"});
  Function.belongsTo(Material, { foreignKey: "materialUsedAsCarrier_id"});
  Material.hasMany(Function, { foreignKey: "materialUsedAsCarrier_id"});
  Function.belongsTo(Material, { foreignKey: "materialUsedAsObject_id"});
  Material.hasMany(Function, { foreignKey: "materialUsedAsObject_id"});
  FunctionQA.belongsTo(Function, { foreignKey: "function_id"});
  Function.hasMany(FunctionQA, { foreignKey: "function_id"});
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
  JournalDetails_Operation.belongsTo(JournalDetails, { foreignKey: "journalDetails_id"});
  JournalDetails.hasMany(JournalDetails_Operation, { foreignKey: "journalDetails_id"});
  JournalDetails_Operation.belongsTo(Operation, { foreignKey: "operation_id"});
  Operation.hasMany(JournalDetails_Operation, { foreignKey: "operation_id"});
  Material.belongsTo(MaterialFamily, { foreignKey: "materialFamily_id"});
  MaterialFamily.hasMany(Material, { foreignKey: "materialFamily_id"});
  Material.belongsTo(Property, { foreignKey: "property_id"});
  Property.hasMany(Material, { foreignKey: "property_id"});
  MaterialQA.belongsTo(Material, { foreignKey: "material_id"});
  Material.hasMany(MaterialQA, { foreignKey: "material_id"});
  Material_Measure.belongsTo(Material, { foreignKey: "material_id"});
  Material.hasMany(Material_Measure, { foreignKey: "material_id"});
  Material_Measure.belongsTo(Measure, { foreignKey: "measure_id"});
  Measure.hasMany(Material_Measure, { foreignKey: "measure_id"});
  Material_Property.belongsTo(Material, { foreignKey: "material_id"});
  Material.hasMany(Material_Property, { foreignKey: "material_id"});
  Material_Property.belongsTo(Property, { foreignKey: "property_id"});
  Property.hasMany(Material_Property, { foreignKey: "property_id"});
  Material_WhirlpoolMaterial.belongsTo(Material, { foreignKey: "material_id"});
  Material.hasMany(Material_WhirlpoolMaterial, { foreignKey: "material_id"});
  Material_WhirlpoolMaterial.belongsTo(WhirlpoolMaterial, { foreignKey: "whr_material_id"});
  WhirlpoolMaterial.hasMany(Material_WhirlpoolMaterial, { foreignKey: "whr_material_id"});
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
  Process.belongsTo(Location, { foreignKey: "location_id"});
  Location.hasMany(Process, { foreignKey: "location_id"});
  Process.belongsTo(State, { foreignKey: "state_id"});
  State.hasMany(Process, { foreignKey: "state_id"});
  Process.belongsTo(Operation, { foreignKey: "operation_id"});
  Operation.hasMany(Process, { foreignKey: "operation_id"});
  Process.belongsTo(Resource, { foreignKey: "resource_id"});
  Resource.hasMany(Process, { foreignKey: "resource_id"});
  Process.belongsTo(ProcessType, { foreignKey: "processType_id"});
  ProcessType.hasMany(Process, { foreignKey: "processType_id"});
  ProcessFailure.belongsTo(FailureType, { foreignKey: "failureType_id"});
  FailureType.hasMany(ProcessFailure, { foreignKey: "failureType_id"});
  ProcessQA.belongsTo(Process, { foreignKey: "process_id"});
  Process.hasMany(ProcessQA, { foreignKey: "process_id"});
  Process_Function.belongsTo(Process, { foreignKey: "process_id"});
  Process.hasMany(Process_Function, { foreignKey: "process_id"});
  Process_Function.belongsTo(Function, { foreignKey: "function_id"});
  Function.hasMany(Process_Function, { foreignKey: "function_id"});
  Process_ProcessFailure.belongsTo(Process, { foreignKey: "process_id"});
  Process.hasMany(Process_ProcessFailure, { foreignKey: "process_id"});
  Process_ProcessFailure.belongsTo(ProcessFailure, { foreignKey: "processFailure_id"});
  ProcessFailure.hasMany(Process_ProcessFailure, { foreignKey: "processFailure_id"});
  Product.belongsTo(ProductionOrder, { foreignKey: "productionOrder_id"});
  ProductionOrder.hasMany(Product, { foreignKey: "productionOrder_id"});
  Product.belongsTo(EngineeringBoM, { foreignKey: "engineeringBoM_id"});
  EngineeringBoM.hasMany(Product, { foreignKey: "engineeringBoM_id"});
  ProductionOrder.belongsTo(ProductionLine, { foreignKey: "productionLine_id"});
  ProductionLine.hasMany(ProductionOrder, { foreignKey: "productionLine_id"});
  RecoveryProcedure.belongsTo(FailureType, { foreignKey: "failureType_id"});
  FailureType.hasMany(RecoveryProcedure, { foreignKey: "failureType_id"});
  Resource.belongsTo(ProductionLine, { foreignKey: "productionLine_id"});
  ProductionLine.hasMany(Resource, { foreignKey: "productionLine_id"});
  Resource.belongsTo(ResourceType, { foreignKey: "resourceType_id"});
  ResourceType.hasMany(Resource, { foreignKey: "resourceType_id"});
  ResourceFailure.belongsTo(FailureType, { foreignKey: "failureType_id"});
  FailureType.hasMany(ResourceFailure, { foreignKey: "failureType_id"});
  Resource_Measure.belongsTo(Resource, { foreignKey: "resource_id"});
  Resource.hasMany(Resource_Measure, { foreignKey: "resource_id"});
  Resource_Measure.belongsTo(Measure, { foreignKey: "measure_id"});
  Measure.hasMany(Resource_Measure, { foreignKey: "measure_id"});
  Resource_ResourceFailure.belongsTo(Resource, { foreignKey: "resource_id"});
  Resource.hasMany(Resource_ResourceFailure, { foreignKey: "resource_id"});
  Resource_ResourceFailure.belongsTo(ResourceFailure, { foreignKey: "resourceFailure_id"});
  ResourceFailure.hasMany(Resource_ResourceFailure, { foreignKey: "resourceFailure_id"});
  Resource_ResourceSetup.belongsTo(Resource, { foreignKey: "resource_id"});
  Resource.hasMany(Resource_ResourceSetup, { foreignKey: "resource_id"});
  Resource_ResourceSetup.belongsTo(ResourceSetup, { foreignKey: "resourceSetup_id"});
  ResourceSetup.hasMany(Resource_ResourceSetup, { foreignKey: "resourceSetup_id"});

  return {
    EngineeringBoM,
    EngineeringBoM_Material,
    FailureType,
    Function,
    FunctionQA,
    Function_Measure,
    Journal,
    JournalDetails,
    JournalDetails_Operation,
    Location,
    Material,
    MaterialFamily,
    MaterialQA,
    Material_Measure,
    Material_Property,
    Material_WhirlpoolMaterial,
    Measure,
    MeasureFailure,
    Operation,
    Process,
    ProcessFailure,
    ProcessQA,
    ProcessType,
    Process_Function,
    Process_ProcessFailure,
    Product,
    ProductionLine,
    ProductionOrder,
    Property,
    RecoveryProcedure,
    Resource,
    ResourceFailure,
    ResourceSetup,
    ResourceType,
    Resource_Measure,
    Resource_ResourceFailure,
    Resource_ResourceSetup,
    State,
    Station,
    WhirlpoolMaterial,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
