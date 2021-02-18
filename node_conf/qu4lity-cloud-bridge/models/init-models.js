var DataTypes = require("sequelize").DataTypes;
var _FailureType = require("./FailureType");
var _Function = require("./Function");
var _Function_Measure = require("./Function_Measure");
var _Journal = require("./Journal");
var _JournalDetails = require("./JournalDetails");
var _Material = require("./Material");
var _MaterialFamily = require("./MaterialFamily");
var _Material_Material = require("./Material_Material");
var _Material_Measure = require("./Material_Measure");
var _Material_Property = require("./Material_Property");
var _Measure = require("./Measure");
var _MeasureResult = require("./MeasureResult");
var _MeasureValues = require("./MeasureValues");
var _Operation = require("./Operation");
var _OperationFailure = require("./OperationFailure");
var _OperationType = require("./OperationType");
var _Product = require("./Product");
var _Product_Material = require("./Product_Material");
var _ProductionLine = require("./ProductionLine");
var _ProductionOrder = require("./ProductionOrder");
var _Property = require("./Property");
var _RecoveryProcedure = require("./RecoveryProcedure");
var _Resource = require("./Resource");
var _ResourceFailure = require("./ResourceFailure");
var _Resource_Measure = require("./Resource_Measure");
var _Setup = require("./Setup");
var _Specification = require("./Specification");
var _Station = require("./Station");

function initModels(sequelize) {
  var FailureType = _FailureType(sequelize, DataTypes);
  var Function = _Function(sequelize, DataTypes);
  var Function_Measure = _Function_Measure(sequelize, DataTypes);
  var Journal = _Journal(sequelize, DataTypes);
  var JournalDetails = _JournalDetails(sequelize, DataTypes);
  var Material = _Material(sequelize, DataTypes);
  var MaterialFamily = _MaterialFamily(sequelize, DataTypes);
  var Material_Material = _Material_Material(sequelize, DataTypes);
  var Material_Measure = _Material_Measure(sequelize, DataTypes);
  var Material_Property = _Material_Property(sequelize, DataTypes);
  var Measure = _Measure(sequelize, DataTypes);
  var MeasureResult = _MeasureResult(sequelize, DataTypes);
  var MeasureValues = _MeasureValues(sequelize, DataTypes);
  var Operation = _Operation(sequelize, DataTypes);
  var OperationFailure = _OperationFailure(sequelize, DataTypes);
  var OperationType = _OperationType(sequelize, DataTypes);
  var Product = _Product(sequelize, DataTypes);
  var Product_Material = _Product_Material(sequelize, DataTypes);
  var ProductionLine = _ProductionLine(sequelize, DataTypes);
  var ProductionOrder = _ProductionOrder(sequelize, DataTypes);
  var Property = _Property(sequelize, DataTypes);
  var RecoveryProcedure = _RecoveryProcedure(sequelize, DataTypes);
  var Resource = _Resource(sequelize, DataTypes);
  var ResourceFailure = _ResourceFailure(sequelize, DataTypes);
  var Resource_Measure = _Resource_Measure(sequelize, DataTypes);
  var Setup = _Setup(sequelize, DataTypes);
  var Specification = _Specification(sequelize, DataTypes);
  var Station = _Station(sequelize, DataTypes);

  Measure.belongsToMany(Function, { through: Function_Measure, foreignKey: "measure_id", otherKey: "function_id", as: "Function" });
  Function.belongsToMany(Measure, { through: Function_Measure, foreignKey: "function_id", otherKey: "measure_id", as: "Measure" });
  Material.belongsToMany(Material, { through: Material_Material, foreignKey: "subMaterial_id", otherKey: "material_id", as: "SubMaterial" });
  Material.belongsToMany(Material, { through: Material_Material, foreignKey: "material_id", otherKey: "subMaterial_id", as: "MasterMaterial" });
  Measure.belongsToMany(Material, { through: Material_Measure, foreignKey: "measure_id", otherKey: "material_id", as: "Material" });
  Material.belongsToMany(Measure, { through: Material_Measure, foreignKey: "material_id", otherKey: "measure_id", as: "Measure" });
  Property.belongsToMany(Material, { through: Material_Property, foreignKey: "property_id", otherKey: "material_id", as: "Material" });
  Material.belongsToMany(Property, { through: Material_Property, foreignKey: "material_id", otherKey: "property_id", as: "Property" });
  Material.belongsToMany(Product, { through: Product_Material, foreignKey: "material_id", otherKey: "product_id", as: "Product" });
  Product.belongsToMany(Material, { through: Product_Material, foreignKey: "product_id", otherKey: "material_id", as: "Material" });
  Measure.belongsToMany(Resource, { through: Resource_Measure, foreignKey: "measure_id", otherKey: "resource_id", as: "Resource" });
  Resource.belongsToMany(Measure, { through: Resource_Measure, foreignKey: "resource_id", otherKey: "measure_id", as: "Measure" });
  Function.belongsTo(Resource, { foreignKey: "resource_id"});
  Resource.hasMany(Function, { foreignKey: "resource_id"});
  Function.belongsTo(Material, { foreignKey: "materialUsedAsCarrier_id"});
  Material.hasMany(Function, { foreignKey: "materialUsedAsCarrier_id"});
  Function.belongsTo(Material, { foreignKey: "materialUsedAsTarget_id"});
  Material.hasMany(Function, { foreignKey: "materialUsedAsTarget_id"});
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
  Material_Material.belongsTo(Material, { foreignKey: "material_id"});
  Material.hasMany(Material_Material, { foreignKey: "material_id"});
  Material_Material.belongsTo(Material, { foreignKey: "subMaterial_id"});
  Material.hasMany(Material_Material, { foreignKey: "subMaterial_id"});
  Material_Measure.belongsTo(Material, { foreignKey: "material_id"});
  Material.hasMany(Material_Measure, { foreignKey: "material_id"});
  Material_Measure.belongsTo(Measure, { foreignKey: "measure_id"});
  Measure.hasMany(Material_Measure, { foreignKey: "measure_id"});
  Material_Property.belongsTo(Material, { foreignKey: "material_id"});
  Material.hasMany(Material_Property, { foreignKey: "material_id"});
  Material_Property.belongsTo(Property, { foreignKey: "property_id"});
  Property.hasMany(Material_Property, { foreignKey: "property_id"});
  MeasureResult.belongsTo(Measure, { foreignKey: "measure_id"});
  Measure.hasMany(MeasureResult, { foreignKey: "measure_id"});
  MeasureResult.belongsTo(FailureType, { foreignKey: "failureType_id"});
  FailureType.hasMany(MeasureResult, { foreignKey: "failureType_id"});
  MeasureResult.belongsTo(Product, { foreignKey: "product_id"});
  Product.hasMany(MeasureResult, { foreignKey: "product_id"});
  MeasureValues.belongsTo(Measure, { foreignKey: "measure_id"});
  Measure.hasMany(MeasureValues, { foreignKey: "measure_id"});
  Operation.belongsTo(OperationType, { foreignKey: "operationType_id"});
  OperationType.hasMany(Operation, { foreignKey: "operationType_id"});
  Operation.belongsTo(Material, { foreignKey: "materialUsedAsCarrier_id"});
  Material.hasMany(Operation, { foreignKey: "materialUsedAsCarrier_id"});
  Operation.belongsTo(Material, { foreignKey: "materialUsedAsTarget_id"});
  Material.hasMany(Operation, { foreignKey: "materialUsedAsTarget_id"});
  Operation.belongsTo(Material, { foreignKey: "materialTransformation_id"});
  Material.hasMany(Operation, { foreignKey: "materialTransformation_id"});
  Operation.belongsTo(Resource, { foreignKey: "resource_id"});
  Resource.hasMany(Operation, { foreignKey: "resource_id"});
  OperationFailure.belongsTo(Resource, { foreignKey: "resource_id"});
  Resource.hasMany(OperationFailure, { foreignKey: "resource_id"});
  OperationFailure.belongsTo(FailureType, { foreignKey: "failureType_id"});
  FailureType.hasMany(OperationFailure, { foreignKey: "failureType_id"});
  Product.belongsTo(ProductionOrder, { foreignKey: "productionOrder_id"});
  ProductionOrder.hasMany(Product, { foreignKey: "productionOrder_id"});
  Product_Material.belongsTo(Product, { foreignKey: "product_id"});
  Product.hasMany(Product_Material, { foreignKey: "product_id"});
  Product_Material.belongsTo(Material, { foreignKey: "material_id"});
  Material.hasMany(Product_Material, { foreignKey: "material_id"});
  ProductionOrder.belongsTo(ProductionLine, { foreignKey: "productionLine_id"});
  ProductionLine.hasMany(ProductionOrder, { foreignKey: "productionLine_id"});
  RecoveryProcedure.belongsTo(FailureType, { foreignKey: "failureType_id"});
  FailureType.hasMany(RecoveryProcedure, { foreignKey: "failureType_id"});
  Resource.belongsTo(Setup, { foreignKey: "setup_id"});
  Setup.hasMany(Resource, { foreignKey: "setup_id"});
  ResourceFailure.belongsTo(Resource, { foreignKey: "resource_id"});
  Resource.hasMany(ResourceFailure, { foreignKey: "resource_id"});
  ResourceFailure.belongsTo(FailureType, { foreignKey: "failureType_id"});
  FailureType.hasMany(ResourceFailure, { foreignKey: "failureType_id"});
  Resource_Measure.belongsTo(Resource, { foreignKey: "resource_id"});
  Resource.hasMany(Resource_Measure, { foreignKey: "resource_id"});
  Resource_Measure.belongsTo(Measure, { foreignKey: "measure_id"});
  Measure.hasMany(Resource_Measure, { foreignKey: "measure_id"});
  Specification.belongsTo(Measure, { foreignKey: "measure_id"});
  Measure.hasMany(Specification, { foreignKey: "measure_id"});
  Station.belongsTo(ProductionLine, { foreignKey: "productionLine_id"});
  ProductionLine.hasMany(Station, { foreignKey: "productionLine_id"});

  return {
    FailureType,
    Function,
    Function_Measure,
    Journal,
    JournalDetails,
    Material,
    MaterialFamily,
    Material_Material,
    Material_Measure,
    Material_Property,
    Measure,
    MeasureResult,
    MeasureValues,
    Operation,
    OperationFailure,
    OperationType,
    Product,
    Product_Material,
    ProductionLine,
    ProductionOrder,
    Property,
    RecoveryProcedure,
    Resource,
    ResourceFailure,
    Resource_Measure,
    Setup,
    Specification,
    Station,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
