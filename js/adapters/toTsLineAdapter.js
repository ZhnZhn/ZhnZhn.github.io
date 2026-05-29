"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.toTsLineAdapter = exports.toRouteTsLineAdapter = void 0;
var _configBuilderFn = require("../charts/configBuilderFn");
var _crAdapterRouter = require("./crAdapterRouter");
var _crAdapterType = require("./crAdapterType1");
var _crTsFromData = _interopRequireDefault(require("./crTsFromData"));
const _fToTsLineAdapter = addToConfig => (0, _crAdapterType.crAdapterType1)({
  crData: _crTsFromData.default,
  addToConfig
});
const toTsLineAdapter = exports.toTsLineAdapter = _fToTsLineAdapter();
const _toTsLineAdapter = _fToTsLineAdapter((config, json) => (0, _configBuilderFn.setDataSourceTo)(config, json.source));
const toRouteTsLineAdapter = exports.toRouteTsLineAdapter = (0, _crAdapterRouter.crAdapterGetRoute)(() => _toTsLineAdapter);
//# sourceMappingURL=toTsLineAdapter.js.map