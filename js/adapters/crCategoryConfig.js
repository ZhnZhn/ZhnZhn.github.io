"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _pipe = _interopRequireDefault(require("../utils/pipe"));
var _configBuilderFn = require("../charts/configBuilderFn");
var _addJenksColorTo = _interopRequireDefault(require("../math/addJenksColorTo"));
var _CategoryFn = require("./CategoryFn");
//data = [{ y, name, c}]
const crCategoryConfig = (title, subtitle, seriaType, seriaColor, data, isAxisLabelsGrey) => (0, _pipe.default)((0, _configBuilderFn.crBarOrColumnConfig)((seriaType || '').split('_')[0], (0, _CategoryFn.crCategories)(data), seriaColor, isAxisLabelsGrey ? void 0 : seriaColor), (0, _configBuilderFn.fAddCaption)(title, subtitle), (0, _configBuilderFn.fAddSeriaBy)(0, {
  color: seriaColor,
  data: (0, _CategoryFn.isCategoryCluster)(seriaType) ? (0, _addJenksColorTo.default)(data) : data
}), _configBuilderFn.setBarConfigHeightIf, _configBuilderFn.toConfig);
var _default = exports.default = crCategoryConfig;
//# sourceMappingURL=crCategoryConfig.js.map