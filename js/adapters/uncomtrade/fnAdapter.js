"use strict";

exports.__esModule = true;
exports.ymdToUTC = exports.valueMoving = exports.roundBy = exports.crZhConfig = exports.crInfo = exports.crChartId = void 0;

var _AdapterFn = require("../AdapterFn");

exports.ymdToUTC = _AdapterFn.ymdToUTC;
exports.valueMoving = _AdapterFn.valueMoving;
exports.roundBy = _AdapterFn.roundBy;

var _fnDescr = require("./fnDescr");

const crChartId = _ref => {
  let {
    value,
    rg = 2,
    measure,
    tp,
    freq,
    period
  } = _ref;
  return [value, rg, measure, tp, freq, period].filter(Boolean).join("_");
};

exports.crChartId = crChartId;

const crInfo = (json, option) => ({
  frequency: option.period || (option.freq === 'M' ? 'Monthly' : 'Annual'),
  description: (0, _fnDescr.toDescr)(json, option)
});

exports.crInfo = crInfo;

const crZhConfig = function (option, _temp) {
  let {
    isLegend
  } = _temp === void 0 ? {} : _temp;

  const {
    oneC,
    period,
    dataSource
  } = option,
        _id = crChartId(option);

  return {
    id: _id,
    key: _id,
    itemCaption: oneC,
    itemTime: period,
    legend: isLegend ? [] : void 0,
    isWithoutIndicator: true,
    dataSource
  };
};

exports.crZhConfig = crZhConfig;
//# sourceMappingURL=fnAdapter.js.map