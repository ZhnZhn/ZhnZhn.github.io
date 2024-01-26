"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _configBuilderFn = require("../../charts/configBuilderFn");
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _crFromYearData = _interopRequireDefault(require("../crFromYearData"));
var _crAdapterRouter = require("../crAdapterRouter");
const toLineAdapter = (0, _crAdapterType.default)({
    crData: _crFromYearData.default,
    addToConfig: (config, json) => (0, _configBuilderFn.setDataSourceTo)(config, json.source)
  }),
  getRoute = () => toLineAdapter,
  EnAdapter = (0, _crAdapterRouter.crAdapterRouter)(void 0, {
    getRoute
  });
var _default = exports.default = EnAdapter;
//# sourceMappingURL=EnAdapter.js.map