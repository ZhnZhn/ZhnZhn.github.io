"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crDataMinMaxSlice = _interopRequireDefault(require("./crDataMinMaxSlice"));
var _crYAxisId = _interopRequireDefault(require("./crYAxisId"));
var _crYAxisSeria = _interopRequireDefault(require("./crYAxisSeria"));
const _crAxis = (id, _ref) => {
  let {
    color,
    min,
    max
  } = _ref;
  return {
    id,
    min,
    max,
    lineColor: color,
    tickColor: color,
    tickWidth: 3,
    tickLenght: 5,
    opossite: true,
    title: {
      text: ''
    },
    gridLineWidth: 0,
    labels: {
      style: {
        color
      }
    },
    showEmpty: false
  };
};
const _getToYAxisId = (chart, options) => {
  const [isNewAxis, yAxisId] = (0, _crYAxisId.default)(chart, options.yIndex, options.name);
  if (isNewAxis) {
    chart.addAxis(_crAxis(yAxisId, options), false, true);
  }
  return yAxisId;
};

//options = {color, name, yIndex, min, max, data, userMax, userMin}
//yIndex =  void 0 | 0 | number
const zhAddSeriaToYAxis = function (options, seriaOptions) {
  if (options === void 0) {
    options = {};
  }
  try {
    const {
        name,
        color
      } = options,
      _seriaInst = this.addSeries((0, _crYAxisSeria.default)(this, {
        color,
        name,
        ...seriaOptions,
        data: (0, _crDataMinMaxSlice.default)(options),
        yAxis: _getToYAxisId(this, options)
      }), false);
    this.redraw();
    return _seriaInst;
  } catch (err) {
    console.log(err.message);
  }
};
var _default = zhAddSeriaToYAxis;
exports.default = _default;
//# sourceMappingURL=zhAddSeriaToYAxis.js.map