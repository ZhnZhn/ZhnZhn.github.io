"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _formatAllNumber = _interopRequireDefault(require("../../utils/formatAllNumber"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _StackedFn = require("./StackedFn");

var _QuandlFn = _interopRequireDefault(require("./QuandlFn2"));

var _assign = Object.assign,
    crStackedAreaConfig = _ChartConfig["default"].crStackedAreaConfig,
    crStackedColumnConfig = _ChartConfig["default"].crStackedColumnConfig,
    setTitleToConfig = _QuandlFn["default"].setTitleToConfig,
    createZhConfig = _QuandlFn["default"].createZhConfig,
    createValueMoving = _QuandlFn["default"].createValueMoving,
    createDatasetInfo = _QuandlFn["default"].createDatasetInfo;

var _setCaption = function _setCaption(config, option, stacking) {
  var PERCENT = stacking === 'percent' ? ':PERCENT' : '';
  option.title = "" + option.title + PERCENT;
  setTitleToConfig(config, option);
};

var fnStacked = {
  crZhConfig: function crZhConfig(option, id) {
    return _assign(createZhConfig(option), {
      id: id,
      isWithoutIndicator: true
    });
  },
  crValueMoving: function crValueMoving(bNowTotal, date, bPrevTotal, dateTo) {
    return _assign(createValueMoving({
      bNowValue: bNowTotal,
      bPrevValue: bPrevTotal
    }), {
      date: date,
      dateTo: dateTo.split('-')[0],
      valueTo: (0, _formatAllNumber["default"])(bPrevTotal),
      isDenyToChange: true
    });
  },
  crConfigOption: function crConfigOption(_ref, json, option) {
    var bNowTotal = _ref.bNowTotal,
        date = _ref.date,
        bPrevTotal = _ref.bPrevTotal,
        dateTo = _ref.dateTo,
        series = _ref.series;
    var _option$value = option.value,
        value = _option$value === void 0 ? '' : _option$value,
        seriaType = option.seriaType,
        id = value + "_" + seriaType;
    return {
      series: series,
      valueMoving: fnStacked.crValueMoving(bNowTotal, date, bPrevTotal, dateTo),
      zhConfig: fnStacked.crZhConfig(option, id),
      info: createDatasetInfo(json)
    };
  },
  crConfig: function crConfig(_ref2) {
    var type = _ref2.type,
        percentType = _ref2.percentType,
        json = _ref2.json,
        option = _ref2.option;
    var jsonData = json.dataset.data,
        _option$sliceItems = option.sliceItems,
        items100 = _option$sliceItems === void 0 ? [] : _option$sliceItems,
        chartType = option.seriaType,
        stacking = chartType === percentType ? 'percent' : 'normal',
        stackedOption = (0, _StackedFn.fnCreateStackedConfig)({
      jsonData: jsonData,
      items100: items100,
      chartType: chartType,
      stacking: stacking
    }),
        crConfig = type === 'column' ? crStackedColumnConfig : crStackedAreaConfig,
        config = crConfig({
      categories: stackedOption.categories,
      stacking: stacking
    });

    _setCaption(config, option, stacking);

    _assign(config, fnStacked.crConfigOption(stackedOption, json, option));

    return {
      config: config
    };
  }
};
var _default = fnStacked;
exports["default"] = _default;
//# sourceMappingURL=fnStacked.js.map