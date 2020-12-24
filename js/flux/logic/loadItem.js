"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _fnFetch = require("../../utils/fnFetch");

var _ChartStore = _interopRequireDefault(require("../stores/ChartStore"));

var _ChartFn = _interopRequireDefault(require("../../charts/ChartFn"));

var _ChartTypes = _interopRequireDefault(require("../../components/dialogs/ChartTypes"));

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

var _crRequestUrl = function _crRequestUrl(api, option, fnCatch, onFailed) {
  try {
    return api.getRequestUrl(option);
  } catch (error) {
    fnCatch({
      error: error,
      option: option,
      onFailed: onFailed
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
    uri: _crRequestUrl(api, option, _fnCatch.fnCatch, onFailed),
    option: option,
    optionFetch: optionFetch,
    getLimitRemaiming: getLimitRemaiming,
    onCheckResponse: api.checkResponse,
    onFetch: _fetchToChartComp.bind(null, objImpl),
    onCompleted: onCompleted,
    fnCatch: _fnCatch.fnCatch,
    onFailed: onFailed
  });
};

var _isNotAllowToAdd = function _isNotAllowToAdd(_ref4, option) {
  var toSeries = _ref4.toSeries,
      isAdd = _ref4.isAdd;
  return !_isFn(toSeries) || _isFn(isAdd) && !isAdd(option);
};

var _loadToChart = function _loadToChart(objImpl, option, onAdded, onFailed) {
  var fnFetch = objImpl.fnFetch,
      api = objImpl.api,
      _ref5 = api || {},
      getLimitRemaiming = _ref5.getLimitRemaiming,
      optionFetch = _crOptionFetch(objImpl, option);

  fnFetch({
    uri: _crRequestUrl(api, option, _fnCatch.fnCatch, onFailed),
    option: option,
    optionFetch: optionFetch,
    getLimitRemaiming: getLimitRemaiming,
    onCheckResponse: api.checkResponse,
    onFetch: _fetchToChart.bind(null, objImpl),
    onCompleted: onAdded,
    fnCatch: _fnCatch.fnCatch,
    onFailed: onFailed
  });
};

var _fetchToChart = function _fetchToChart(objImpl, _ref6) {
  var json = _ref6.json,
      option = _ref6.option,
      onCompleted = _ref6.onCompleted;

  var adapter = objImpl.adapter,
      label = option.itemCaption,
      value = option.value,
      hasSecondYAxis = option.hasSecondYAxis,
      chart = _ChartStore["default"].getActiveChart(),
      series = adapter.toSeries(json, option, chart),
      _ref7 = series || {},
      itemCaption = _ref7.itemCaption,
      color = _ref7.color,
      zhColor = _ref7.zhColor;

  _ChartFn["default"].addSeriaWithRenderLabel({
    chart: chart,
    series: series,
    label: itemCaption || label || value,
    color: color || zhColor,
    hasSecondYAxis: !!hasSecondYAxis
  });

  onCompleted(option);
};

var _isAddCategoryToSpline = function _isAddCategoryToSpline(_ref8) {
  var seriaType = _ref8.seriaType;

  var chart = _ChartStore["default"].getActiveChart();

  return seriaType && _ChartTypes["default"].isCategory({
    value: seriaType
  }) && chart && _isArr(chart.xAxis) && !_isArr(chart.xAxis[0].categories);
};

var _runAsync = function _runAsync(fn, mls) {
  if (mls === void 0) {
    mls = 500;
  }

  setTimeout(fn, mls);
};

var _loadItem = function _loadItem(objImpl, option, onCompleted, onAdded, onFailed) {
  var parentId = _ChartStore["default"].isLoadToChart();

  if (!parentId) {
    _loadToChartComp(objImpl, option, onCompleted, onFailed);
  } else {
    if (_isNotAllowToAdd(objImpl.adapter, option)) {
      _runAsync(function () {
        (0, _fnCatch.fnCatch)({
          error: new Error("ERR_10"),
          option: option,
          onFailed: onFailed
        });
      });
    } else if (_isAddCategoryToSpline(option)) {
      _runAsync(function () {
        return onFailed(ALERT.CATEGORY_TO_SPLINE);
      });
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