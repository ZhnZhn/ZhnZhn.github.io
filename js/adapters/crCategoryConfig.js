"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _addColorClustersTo = _interopRequireDefault(require("../math/addColorClustersTo"));

var _ConfigBuilder = _interopRequireDefault(require("../charts/ConfigBuilder"));

const _crCategories = data => data.map(item => item.c); //data = [{ y, name, c}]


const crCategoryConfig = (title, subtitle, seriaType, seriaColor, data, isCluster) => (0, _ConfigBuilder.default)().barOrColumnConfig(seriaType, _crCategories(data)).addCaption(title, subtitle).addSeriaBy(0, {
  color: seriaColor,
  data: isCluster ? (0, _addColorClustersTo.default)(data) : data
}).toConfig();

var _default = crCategoryConfig;
exports.default = _default;
//# sourceMappingURL=crCategoryConfig.js.map