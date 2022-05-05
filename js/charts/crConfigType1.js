"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = require("../adapters/AdapterFn");

var _ConfigBuilder = _interopRequireDefault(require("./ConfigBuilder"));

const crConfigType1 = _ref => {
  let {
    option,
    data,
    confOption
  } = _ref;
  const {
    seriaType,
    seriaColor,
    seriaWidth,
    title,
    subtitle
  } = option,
        seria = (0, _ConfigBuilder.default)().splineSeria({
    seriaType,
    seriaColor,
    seriaWidth,
    data
  }).toSeria();
  return (0, _ConfigBuilder.default)().area2Config(title, subtitle).addSeries(seria).addMinMax(data, option).add({
    valueMoving: (0, _AdapterFn.valueMoving)(data)
  }).add(confOption).toConfig();
};

crConfigType1.Builder = _ConfigBuilder.default;
var _default = crConfigType1;
exports.default = _default;
//# sourceMappingURL=crConfigType1.js.map