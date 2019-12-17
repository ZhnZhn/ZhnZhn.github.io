"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _fnFetch = require("../../utils/fnFetch");

var _ChartStore = _interopRequireDefault(require("../stores/ChartStore"));

var _ChartFn = _interopRequireDefault(require("../../charts/ChartFn"));

var _fnCatch = require("./fnCatch");

var ALERT = {
  CATEGORY_TO_SPLINE: {
    alertCaption: 'Series Error',
    alertDescr: "Adding category seria to not category isn't allowed."
  }
};
var _isArr = Array.isArray;

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _crOptionFetch = function _crOptionFetch(_ref, option) {
  var optionFetch = _ref.optionFetch;
  return _isFn(optionFetch) ? optionFetch(option) : optionFetch;
};

var _fetchToChartComp = function _fetchToChartComp(objImpl, _ref2) {
  var json = _ref2.json,
      option = _ref2.option,
      onCompleted = _ref2.onCompleted;

  var adapter = objImpl.adapter,
      _adapter$toConfig = adapter.toConfig(json, option),
      config = _adapter$toConfig.config;

  if (!_isFn(config.then)) {
    onCompleted(option, config);
  } else {
    config.then(function (config) {
      onCompleted(option, config);
      return;
    });
  }
};

var _loadToChartComp = function _loadToChartComp(objImpl, option, onCompleted, onFailed) {
  var fnFetch = objImpl.fnFetch,
      api = objImpl.api,
      _ref3 = api || {},
      getLimitRemaiming = _ref3.getLimitRemaiming,
      optionFetch = _crOptionFetch(objImpl, option);

  fnFetch({
    uri: api.getRequestUrl(option),
    option: option,
    optionFetch: optionFetch,
    getLimitRemaiming: getLimitRemaiming,
    onCheckResponse: api.checkResponse,
    onFetch: _fetchToChartComp.bind(null, objImpl),
    onCompleted: onCompleted,
    onCatch: _fnCatch.fnCatch,
    onFailed: onFailed
  });
};

var _loadToChart = function _loadToChart(objImpl, option, onAdded, onFailed) {
  var fnFetch = objImpl.fnFetch,
      api = objImpl.api,
      _ref4 = api || {},
      getLimitRemaiming = _ref4.getLimitRemaiming,
      optionFetch = _crOptionFetch(objImpl, option);

  fnFetch({
    uri: api.getRequestUrl(option),
    option: option,
    optionFetch: optionFetch,
    getLimitRemaiming: getLimitRemaiming,
    onCheckResponse: api.checkResponse,
    onFetch: _fetchToChart.bind(null, objImpl),
    onCompleted: onAdded,
    onCatch: _fnCatch.fnCatch,
    onFailed: onFailed
  });
};

var _fetchToChart = function _fetchToChart(objImpl, _ref5) {
  var json = _ref5.json,
      option = _ref5.option,
      onCompleted = _ref5.onCompleted;

  var adapter = objImpl.adapter,
      itemCaption = option.itemCaption,
      value = option.value,
      hasSecondYAxis = option.hasSecondYAxis,
      chart = _ChartStore["default"].getActiveChart(),
      series = adapter.toSeries(json, option, chart),
      _ref6 = series || {},
      zhItemCaption = _ref6.zhItemCaption,
      color = _ref6.color,
      zhColor = _ref6.zhColor;

  _ChartFn["default"].addSeriaWithRenderLabel({
    chart: chart,
    series: series,
    label: zhItemCaption || itemCaption || value,
    color: color || zhColor,
    hasSecondYAxis: !!hasSecondYAxis
  });

  onCompleted(option);
};

var _isAddCategoryToSpline = function _isAddCategoryToSpline(_ref7) {
  var seriaType = _ref7.seriaType;

  var chart = _ChartStore["default"].getActiveChart();

  return seriaType && seriaType.indexOf('_SET') !== -1 && chart && _isArr(chart.xAxis) && !_isArr(chart.xAxis[0].categories);
};

var _loadItem = function _loadItem(objImpl, option, onCompleted, onAdded, onFailed) {
  var parentId = _ChartStore["default"].isLoadToChart();

  if (!parentId) {
    _loadToChartComp(objImpl, option, onCompleted, onFailed);
  } else {
    if (_isAddCategoryToSpline(option)) {
      onFailed(ALERT.CATEGORY_TO_SPLINE);
    } else {
      option.parentId = parentId;

      _loadToChart(objImpl, option, onAdded, onFailed);
    }
  }
};

var _crLoadFns = function _crLoadFns(objImpl) {
  return objImpl.id === 'Q' ? {
    fnFetchToChartComp: _fetchToChartComp.bind(null, objImpl),
    fnFetchToChart: _fetchToChart.bind(null, objImpl)
  } : void 0;
};

var fLoadItem = function fLoadItem(objImpl) {
  var _objImpl$fnFetch = objImpl.fnFetch,
      fnFetch = _objImpl$fnFetch === void 0 ? _fnFetch.fetchJson : _objImpl$fnFetch,
      api = objImpl.api,
      adapter = objImpl.adapter,
      _loadFns = _crLoadFns(objImpl);

  objImpl.fnFetch = fnFetch;
  return (0, _extends2["default"])({
    loadItem: _loadItem.bind(null, objImpl),
    addPropsTo: api.addPropsTo,
    crKey: adapter.crKey
  }, _loadFns);
};

var _default = fLoadItem;
exports["default"] = _default;
//# sourceMappingURL=loadItem.js.map