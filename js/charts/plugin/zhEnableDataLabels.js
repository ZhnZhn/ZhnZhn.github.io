"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var DATA_LABELS = {
  enabled: true,
  color: 'black',
  crop: false,
  overflow: 'allow',
  style: {
    fontSize: 14
  }
};

var zhEnableDataLabels = function zhEnableDataLabels(seriaType, options) {
  if (seriaType === void 0) {
    seriaType = 'columnrange';
  }

  try {
    var _plotOptions;

    this.update({
      plotOptions: (_plotOptions = {}, _plotOptions[seriaType] = {
        dataLabels: (0, _extends2["default"])({}, options, {}, DATA_LABELS)
      }, _plotOptions)
    });
  } catch (err) {
    console.log(err);
  }
};

var _default = zhEnableDataLabels;
exports["default"] = _default;
//# sourceMappingURL=zhEnableDataLabels.js.map