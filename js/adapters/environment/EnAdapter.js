"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _configBuilderFn = require("../../charts/configBuilderFn");
var _crAdapterType = require("../crAdapterType1");
var _crFromYearData = _interopRequireDefault(require("../crFromYearData"));
var _crAdapterRouter = require("../crAdapterRouter");
const toLineAdapter = (0, _crAdapterType.crAdapterType1)({
    crData: _crFromYearData.default,
    addToConfig: (config, json) => (0, _configBuilderFn.setDataSourceTo)(config, json.source)
  }),
  EnAdapter = (0, _crAdapterRouter.crAdapterRouter)({
    getRoute: () => toLineAdapter
  });
var _default = exports.default = EnAdapter;
//# sourceMappingURL=EnAdapter.js.map