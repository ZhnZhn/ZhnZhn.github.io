"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../adapters/AdapterFn"));

var _ConfigBuilder = _interopRequireDefault(require("./ConfigBuilder"));

var valueMoving = _AdapterFn["default"].valueMoving;

var crConfigType1 = function crConfigType1(_ref) {
  var option = _ref.option,
      data = _ref.data,
      confOption = _ref.confOption;
  var seriaType = option.seriaType,
      seriaColor = option.seriaColor,
      seriaWidth = option.seriaWidth,
      title = option.title,
      subtitle = option.subtitle,
      seria = (0, _ConfigBuilder["default"])().splineSeria({
    seriaType: seriaType,
    seriaColor: seriaColor,
    seriaWidth: seriaWidth,
    data: data
  }).toSeria();
  return (0, _ConfigBuilder["default"])().area2Config(title, subtitle).addSeries(seria).addMinMax(data, option).add({
    valueMoving: valueMoving(data)
  }).add(confOption).toConfig();
};

crConfigType1.Builder = _ConfigBuilder["default"];
var _default = crConfigType1;
exports["default"] = _default;
//# sourceMappingURL=crConfigType1.js.map