"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _bindTo = require("../../utils/bindTo");
var _fnFetch = require("../../utils/fnFetch");
var _CategoryFn = require("../../adapters/CategoryFn");
var _initChartTheme = require("../../charts/initChartTheme");
var _chartCheckBoxLogic = require("../stores/chartCheckBoxLogic");
var _ChartFn = require("../../charts/ChartFn");
var _ChartOptionsFn = require("../../components/dialogs/ChartOptionsFn");
var _onCatch = _interopRequireDefault(require("./onCatch"));
const ALERT_CATEGORY_TO_SPLINE = {
  alertCaption: "Series Error",
  alertDescr: "Adding category seria to not category isn't allowed."
};
const _crOptionFetch = (_ref, option) => {
  let {
    optionFetch
  } = _ref;
  return (0, _isTypeFn.isFn)(optionFetch) ? optionFetch(option) : optionFetch;
};
const _fetchToChartComp = (objImpl, _ref2) => {
  let {
    json,
    option,
    onCompleted
  } = _ref2;
  const {
      adapter
    } = objImpl,
    {
      config
    } = adapter.toConfig(json, option),
    _onCompleteImpl = () => {
      if (!(0, _isTypeFn.isFn)(config.then)) {
        onCompleted(option, config);
      } else {
        config.then(config => {
          onCompleted(option, config);
        });
      }
    };
  if ((0, _CategoryFn.isTreeMap)(option)) {
    (0, _initChartTheme.loadTreeMap)().then(_onCompleteImpl);
  } else {
    _onCompleteImpl();
  }
};
const _crRequestUrl = (api, option, onFailed) => {
  try {
    return api.getRequestUrl(option);
  } catch (error) {
    (0, _onCatch.default)({
      error,
      option,
      onFailed
    });
  }
};
const _loadToChartComp = (objImpl, option, onCompleted, onFailed) => {
  const {
      fnFetch,
      api
    } = objImpl,
    {
      getLimitRemaiming
    } = api || {},
    optionFetch = _crOptionFetch(objImpl, option);
  fnFetch({
    uri: _crRequestUrl(api, option, onFailed),
    option,
    optionFetch,
    getLimitRemaiming,
    onCheckResponse: api.checkResponse,
    onFetch: (0, _bindTo.bindTo)(_fetchToChartComp, objImpl),
    onCompleted: onCompleted,
    onCatch: _onCatch.default,
    onFailed
  });
};
const _isNotAllowToAdd = (_ref3, option) => {
  let {
    toSeries,
    isAdd
  } = _ref3;
  return !(0, _isTypeFn.isFn)(toSeries) || (0, _isTypeFn.isFn)(isAdd) && !isAdd(option);
};
const _loadToChart = (objImpl, option, onAdded, onFailed) => {
  const {
      fnFetch,
      api
    } = objImpl,
    {
      getLimitRemaiming
    } = api || {},
    optionFetch = _crOptionFetch(objImpl, option);
  fnFetch({
    uri: _crRequestUrl(api, option, onFailed),
    option,
    optionFetch,
    getLimitRemaiming,
    onCheckResponse: api.checkResponse,
    onFetch: (0, _bindTo.bindTo)(_fetchToChart, objImpl),
    onCompleted: onAdded,
    onCatch: _onCatch.default,
    onFailed
  });
};
const _fetchToChart = (objImpl, _ref4) => {
  let {
    json,
    option,
    onCompleted
  } = _ref4;
  const {
      adapter
    } = objImpl,
    {
      itemCaption: label,
      value,
      hasSecondYAxis
    } = option,
    chart = (0, _chartCheckBoxLogic.getActiveChart)(),
    series = adapter.toSeries(json, option, chart),
    {
      itemCaption,
      color,
      zhColor
    } = series || {};
  (0, _ChartFn.addSeriaWithRenderLabel)({
    chart,
    series,
    label: itemCaption || label || value,
    color: color || zhColor,
    hasSecondYAxis: !!hasSecondYAxis
  });
  onCompleted(option);
};
const _isAddCategoryToSpline = _ref5 => {
  let {
    seriaType
  } = _ref5;
  const chart = (0, _chartCheckBoxLogic.getActiveChart)();
  return seriaType && (0, _ChartOptionsFn.isCategoryItem)({
    value: seriaType
  }) && chart && (0, _isTypeFn.isArr)(chart.xAxis) && !(0, _isTypeFn.isArr)(chart.xAxis[0].categories);
};
const _runAsync = function (fn, mls) {
  if (mls === void 0) {
    mls = 500;
  }
  setTimeout(fn, mls);
};
const _loadItem = (objImpl, option, onCompleted, onAdded, onFailed) => {
  const parentId = (0, _chartCheckBoxLogic.isLoadToChart)();
  if (!parentId) {
    _loadToChartComp(objImpl, option, onCompleted, onFailed);
  } else {
    if (_isNotAllowToAdd(objImpl.adapter, option)) {
      _runAsync(() => {
        (0, _onCatch.default)({
          error: new Error("ERR_10"),
          option,
          onFailed
        });
      });
    } else if (_isAddCategoryToSpline(option)) {
      _runAsync(() => onFailed(ALERT_CATEGORY_TO_SPLINE));
    } else {
      option.parentId = parentId;
      _loadToChart(objImpl, option, onAdded, onFailed);
    }
  }
};
const fLoadItem = objImpl => {
  const {
    fnFetch = _fnFetch.fetchJson,
    api,
    adapter
  } = objImpl;
  objImpl.fnFetch = fnFetch;
  return {
    loadItem: (0, _bindTo.bindTo)(_loadItem, objImpl),
    addPropsTo: api.addPropsTo,
    crKey: adapter.crKey
  };
};
var _default = exports.default = fLoadItem;
//# sourceMappingURL=loadItem.js.map