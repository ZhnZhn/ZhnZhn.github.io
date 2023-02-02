"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crDimConfigEs = _interopRequireDefault(require("./crDimConfigEs"));
var _crDimConfigSdn = _interopRequireDefault(require("./crDimConfigSdn"));
var _crDimConfig = _interopRequireDefault(require("./crDimConfig"));
var _loadJson = _interopRequireDefault(require("./loadJson"));
const _isArr = Array.isArray;
const _isEs = (dimension, source) => dimension && source === 'ESTAT';
const _isSdn = item => item && item.id && item.text && !_isArr(item.valueTexts) && _isArr(item.values);
const _crDimsConfig = json => {
  const dims = [],
    {
      variables,
      dimension,
      source
    } = json;
  let timeId,
    mapFrequency = 'Y';
  if (_isEs(dimension, source)) {
    return (0, _crDimConfigEs.default)(dimension);
  }
  if (!_isArr(variables)) {
    return {
      dims,
      timeId,
      mapFrequency
    };
  }
  if (_isSdn(variables[0])) {
    return (0, _crDimConfigSdn.default)(variables);
  }
  return (0, _crDimConfig.default)(variables);
};
const loadDimsWithOptions = url => (0, _loadJson.default)(url).then(_crDimsConfig);
var _default = loadDimsWithOptions;
exports.default = _default;
//# sourceMappingURL=loadDimsWithOptions.js.map