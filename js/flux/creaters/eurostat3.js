"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _isThreeTable = function _isThreeTable(dfProps, _items, metric) {
  if (dfProps.dfT !== 'three') {
    _items.push(metric);
  } else {
    Object.assign(dfProps, {
      dfTable: metric.value,
      dfTail: metric.dfTail
    });
  }
};

var _isDfParams = function _isDfParams(dfProps, groupV, metricV) {
  if (!dfProps.dfParams) {
    Object.assign(dfProps, {
      dfParams: ["geo"],
      dfTable: groupV,
      dfTail: metricV
    });
  }
};

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
      _options$one = _options.one,
      one = _options$one === void 0 ? {} : _options$one,
      _options$group = _options.group,
      group = _options$group === void 0 ? {} : _options$group,
      _options$metric = _options.metric,
      metric = _options$metric === void 0 ? {} : _options$metric,
      _options$chartType = _options.chartType,
      chartType = _options$chartType === void 0 ? {} : _options$chartType,
      seriaColor = _options.seriaColor,
      seriaWidth = _options.seriaWidth,
      date = _options.date,
      dialogOptions = _options.dialogOptions,
      _one$caption = one.caption,
      oneC = _one$caption === void 0 ? '' : _one$caption,
      oneV = one.value,
      _group$caption = group.caption,
      groupC = _group$caption === void 0 ? '' : _group$caption,
      groupV = group.value,
      _metric$caption = metric.caption,
      metricC = _metric$caption === void 0 ? '' : _metric$caption,
      metricV = metric.value,
      seriaType = chartType.value,
      compType = chartType.compType,
      _items = [one, group];

  _isThreeTable(dfProps, _items, metric);

  _isDfParams(dfProps, groupV, metricV);

  return (0, _extends2["default"])({}, dfProps, {}, dialogOptions, {
    geo: oneV,
    group: groupV,
    metric: metricV,
    seriaType: seriaType,
    seriaColor: seriaColor,
    seriaWidth: seriaWidth,
    zhCompType: compType,
    //items: [ one, group, metric ],
    items: _items,
    time: date,
    loadId: loadId,
    itemCaption: oneC,
    title: oneC,
    subtitle: groupC + ": " + metricC,
    alertItemId: oneC + ": " + metricC,
    alertGeo: oneC,
    alertMetric: metricC,
    dataSource: dataSource
  });
};

var _default = createLoadOptions;
exports["default"] = _default;
//# sourceMappingURL=eurostat3.js.map