"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _pipe = _interopRequireDefault(require("../utils/pipe"));
var _configBuilderFn = require("../charts/configBuilderFn");
var _addJenksColorTo = _interopRequireDefault(require("../math/addJenksColorTo"));
const _crCategories = data => data.map(item => item.c);

//data = [{ y, name, c}]
const crCategoryConfig = (title, subtitle, seriaType, seriaColor, data, isCluster) => (0, _pipe.default)((0, _configBuilderFn.crBarOrColumnConfig)(seriaType, _crCategories(data)), (0, _configBuilderFn.fAddCaption)(title, subtitle), (0, _configBuilderFn.fAddSeriaBy)(0, {
  color: seriaColor,
  data: isCluster ? (0, _addJenksColorTo.default)(data) : data
}), _configBuilderFn.toConfig);
var _default = crCategoryConfig;
exports.default = _default;
//# sourceMappingURL=crCategoryConfig.js.map