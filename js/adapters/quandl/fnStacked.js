"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _formatAllNumber = _interopRequireDefault(require("../../utils/formatAllNumber"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _StackedFn = require("./StackedFn");

var _QuandlFn = require("./QuandlFn");

const _assign = Object.assign,
      {
  crStackedAreaConfig,
  crStackedColumnConfig
} = _ChartConfig.default;

const _setCaption = (config, option, stacking) => {
  const PERCENT = stacking === 'percent' ? ':PERCENT' : '';
  option.title = "" + option.title + PERCENT;
  (0, _QuandlFn.setTitleToConfig)(config, option);
};

const fnStacked = {
  crZhConfig: (option, id) => _assign((0, _QuandlFn.crZhConfig)(option), {
    id,
    isWithoutIndicator: true
  }),
  crValueMoving: (bNowTotal, date, bPrevTotal, dateTo) => _assign((0, _QuandlFn.crValueMoving)({
    bNowValue: bNowTotal,
    bPrevValue: bPrevTotal
  }), {
    date: date,
    dateTo: dateTo.split('-')[0],
    valueTo: (0, _formatAllNumber.default)(bPrevTotal),
    isDenyToChange: true
  }),
  crConfigOption: (_ref, json, option) => {
    let {
      bNowTotal,
      date,
      bPrevTotal,
      dateTo,
      series
    } = _ref;
    const {
      value = '',
      seriaType
    } = option,
          id = value + "_" + seriaType;
    return {
      series: series,
      valueMoving: fnStacked.crValueMoving(bNowTotal, date, bPrevTotal, dateTo),
      zhConfig: fnStacked.crZhConfig(option, id),
      info: (0, _QuandlFn.crDatasetInfo)(json)
    };
  },
  crConfig: _ref2 => {
    let {
      type,
      percentType,
      json,
      option
    } = _ref2;
    const jsonData = json.dataset.data,
          {
      sliceItems: items100 = [],
      seriaType: chartType
    } = option,
          stacking = chartType === percentType ? 'percent' : 'normal',
          stackedOption = (0, _StackedFn.crStackedConfig)({
      jsonData,
      items100,
      chartType,
      stacking
    }),
          crConfig = type === 'column' ? crStackedColumnConfig : crStackedAreaConfig,
          config = crConfig({
      categories: stackedOption.categories,
      stacking
    });

    _setCaption(config, option, stacking);

    _assign(config, fnStacked.crConfigOption(stackedOption, json, option));

    return {
      config
    };
  }
};
var _default = fnStacked;
exports.default = _default;
//# sourceMappingURL=fnStacked.js.map