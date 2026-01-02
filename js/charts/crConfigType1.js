"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../utils/isTypeFn");
var _pipe = _interopRequireDefault(require("../utils/pipe"));
var _mathFn = require("../math/mathFn");
var _configBuilderFn = require("./configBuilderFn");
const ifCaseRoundBy = (rt, data) => {
  if ((0, _isTypeFn.isNumber)(rt) && (0, _isTypeFn.isArr)(data[0])) {
    data.forEach(p => {
      p[1] = (0, _mathFn.roundBy)(p[1], rt);
    });
  }
};
const crConfigType1 = _ref => {
  let {
    option,
    data,
    confOption
  } = _ref;
  const {
    _rt
  } = option;
  ifCaseRoundBy(_rt, data);
  return (0, _pipe.default)((0, _configBuilderFn.crSplineConfig)(data, option), (0, _configBuilderFn.fAddMinMax)(data, option), (0, _configBuilderFn.fAdd)(confOption), _configBuilderFn.toConfig);
};
var _default = exports.default = crConfigType1;
//# sourceMappingURL=crConfigType1.js.map