"use strict";

exports.__esModule = true;
exports.zhEnableDataLabels = exports.zhDisableDataLabels = void 0;
var _ChartFn = require("../ChartFn");
const _crDataLabelsConfig = isEnabled => ({
  enabled: isEnabled,
  color: (0, _ChartFn.getColorBlack)(),
  crop: false,
  overflow: 'allow',
  style: {
    fontSize: 14
  }
});
const _crDataLabels = (seriaType, dataLabels) => ({
  plotOptions: {
    [seriaType]: {
      dataLabels
    }
  }
});
const _tryUpdate = (inst, options) => {
  try {
    inst.update(options);
  } catch (err) {
    console.log(err);
  }
};
const _getSeriaType = chartInst => chartInst.options.chart.type;
const _fDataLabels = isEnabled => function (seriaType) {
  _tryUpdate(this, _crDataLabels(seriaType || _getSeriaType(this), _crDataLabelsConfig(isEnabled)));
};
const zhEnableDataLabels = exports.zhEnableDataLabels = _fDataLabels(true);
const zhDisableDataLabels = exports.zhDisableDataLabels = _fDataLabels(false);
//# sourceMappingURL=zhEnableDataLabels.js.map