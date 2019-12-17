"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var DF_CAPTION = 'EU';

var createLoadOptions = function createLoadOptions(props, options) {
  if (props === void 0) {
    props = {};
  }

  if (options === void 0) {
    options = {};
  }

  var _props = props,
      loadId = _props.loadId,
      dataSource = _props.dataSource,
      _props$dfProps = _props.dfProps,
      dfProps = _props$dfProps === void 0 ? {} : _props$dfProps,
      _options = options,
      one = _options.one,
      _options$two = _options.two,
      two = _options$two === void 0 ? {} : _options$two,
      dialogOptions = _options.dialogOptions,
      _options$chartType = _options.chartType,
      chartType = _options$chartType === void 0 ? {} : _options$chartType,
      seriaColor = _options.seriaColor,
      date = _options.date,
      selectOptions = _options.selectOptions,
      _seriaType = chartType.value,
      _zhCompType = chartType.compType,
      _oneV = one ? one.value : DF_CAPTION,
      _oneC = one ? one.caption : dfProps.dfSliceTitle || DF_CAPTION;

  return (0, _extends2["default"])({}, dfProps, {}, dialogOptions, {
    itemMap: two,
    geo: _oneV,
    metric: two.value,
    loadId: loadId,
    itemCaption: _oneC,
    title: _oneC,
    subtitle: two.caption,
    alertItemId: _oneC + ":" + two.caption,
    alertGeo: _oneC,
    alertMetric: two.caption,
    seriaType: _seriaType,
    seriaColor: seriaColor,
    zhCompType: _zhCompType,
    time: date,
    dataSource: dataSource,
    items: [one, two],
    selectOptions: selectOptions
  });
};

var _default = createLoadOptions;
exports["default"] = _default;
//# sourceMappingURL=eurostat2.js.map