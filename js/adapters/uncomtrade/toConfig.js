"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _CategoryFn = require("../CategoryFn");
var _toTreeMap = _interopRequireDefault(require("./toTreeMap"));
var _toCategory = _interopRequireDefault(require("./toCategory"));
var _toSeriesConfig = _interopRequireDefault(require("./toSeriesConfig"));
const _fToConfig = toConfig => (json, option) => ({
  config: toConfig(json, option)
});
const toConfig = option => ({
  toConfig: _fToConfig((0, _CategoryFn.isTreeMap)(option) ? _toTreeMap.default : (0, _CategoryFn.isDotSet)(option) ? _toSeriesConfig.default : _toCategory.default)
});
var _default = exports.default = toConfig;
//# sourceMappingURL=toConfig.js.map