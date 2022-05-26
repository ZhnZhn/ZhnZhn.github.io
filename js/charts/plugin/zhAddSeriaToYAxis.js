"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crDataMinMaxSlice = _interopRequireDefault(require("./crDataMinMaxSlice"));

var _crYAxisId = _interopRequireDefault(require("./crYAxisId"));

var _crYAxisSeria = _interopRequireDefault(require("./crYAxisSeria"));

const _crAxis = (id, color) => ({
  id,
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
}); //options = {color, name, yIndex, data, userMax, userMin}
//yIndex =  void 0 | 0 | number


const zhAddSeriaToYAxis = function (options, seriaOptions) {
  if (options === void 0) {
    options = {};
  }

  try {
    const {
      color,
      yIndex,
      name
    } = options,
          [isNewAxis, yAxisId] = (0, _crYAxisId.default)(this, yIndex, name);

    if (isNewAxis) {
      this.addAxis(_crAxis(yAxisId, color), false, true);
    }

    const _seria = (0, _crYAxisSeria.default)(this, {
      color,
      name,
      ...seriaOptions,
      data: (0, _crDataMinMaxSlice.default)(options),
      yAxis: yAxisId
    }),
          _seriaInst = this.addSeries(_seria, false);

    this.redraw();
    return _seriaInst;
  } catch (err) {
    console.log(err.message);
  }
};

var _default = zhAddSeriaToYAxis;
exports.default = _default;
//# sourceMappingURL=zhAddSeriaToYAxis.js.map