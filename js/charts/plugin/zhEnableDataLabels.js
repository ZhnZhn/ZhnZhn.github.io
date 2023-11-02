"use strict";

exports.__esModule = true;
exports.default = void 0;
var _ChartFn = require("../ChartFn");
const _crDataLabelsConfig = () => ({
  enabled: true,
  color: (0, _ChartFn.getColorBlack)(),
  crop: false,
  overflow: 'allow',
  style: {
    fontSize: 14
  }
});
const zhEnableDataLabels = function (seriaType, options) {
  if (seriaType === void 0) {
    seriaType = 'columnrange';
  }
  try {
    this.update({
      plotOptions: {
        [seriaType]: {
          dataLabels: {
            ...options,
            ..._crDataLabelsConfig()
          }
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};
var _default = exports.default = zhEnableDataLabels;
//# sourceMappingURL=zhEnableDataLabels.js.map