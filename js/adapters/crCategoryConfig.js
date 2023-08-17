"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _pipe = _interopRequireDefault(require("../utils/pipe"));
var _configBuilderFn = require("../charts/configBuilderFn");
var _addJenksColorTo = _interopRequireDefault(require("../math/addJenksColorTo"));
var _CategoryFn = require("./CategoryFn");
//data = [{ y, name, c}]
const crCategoryConfig = (title, subtitle, seriaType, seriaColor, data, isCluster) => (0, _pipe.default)((0, _configBuilderFn.crBarOrColumnConfig)(seriaType, (0, _CategoryFn.crCategories)(data)), (0, _configBuilderFn.fAddCaption)(title, subtitle), (0, _configBuilderFn.fAddSeriaBy)(0, {
  color: seriaColor,
  data: isCluster ? (0, _addJenksColorTo.default)(data) : data
}), _configBuilderFn.toConfig);
var _default = crCategoryConfig;
exports.default = _default;
//# sourceMappingURL=crCategoryConfig.js.map