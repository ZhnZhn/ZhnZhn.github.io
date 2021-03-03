"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _crDataMinMaxSlice = _interopRequireDefault(require("./crDataMinMaxSlice"));

var _crYAxisId2 = _interopRequireDefault(require("./crYAxisId"));

var _crYAxisSeria = _interopRequireDefault(require("./crYAxisSeria"));

var _crAxis = function _crAxis(id, color) {
  return {
    id: id,
    opossite: true,
    title: {
      text: ''
    },
    lineColor: color,
    tickColor: color,
    gridLineWidth: 0,
    labels: {
      style: {
        color: color
      }
    },
    showEmpty: false
  };
}; //options = {color, name, yIndex, data, userMax, userMin}
//yIndex =  void 0 | 0 | number


var zhAddSeriaToYAxis = function zhAddSeriaToYAxis(options, seriaOptions) {
  if (options === void 0) {
    options = {};
  }

  if (seriaOptions === void 0) {
    seriaOptions = {};
  }

  try {
    var _options = options,
        color = _options.color,
        yIndex = _options.yIndex,
        name = _options.name,
        _crYAxisId = (0, _crYAxisId2["default"])(this, yIndex, name),
        isNewAxis = _crYAxisId[0],
        yAxisId = _crYAxisId[1];

    if (isNewAxis) {
      this.addAxis(_crAxis(yAxisId, color), false, true);
    }

    var _seria = (0, _crYAxisSeria["default"])(this, (0, _extends2["default"])({
      color: color,
      name: name
    }, seriaOptions, {
      data: (0, _crDataMinMaxSlice["default"])(options),
      yAxis: yAxisId
    })),
        _seriaInst = this.addSeries(_seria, false);

    this.redraw();
    return _seriaInst;
  } catch (err) {
    console.log(err.message);
  }
};

var _default = zhAddSeriaToYAxis;
exports["default"] = _default;
//# sourceMappingURL=zhAddSeriaToYAxis.js.map