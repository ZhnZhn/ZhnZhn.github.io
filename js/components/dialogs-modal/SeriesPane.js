"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _ScrollPane = _interopRequireDefault(require("../zhn/ScrollPane"));
var _PasteToTitle = _interopRequireDefault(require("./PasteToTitle"));
var _PasteToSeriaList = _interopRequireDefault(require("./PasteToSeriaList"));
var _SeriesPaneFn = require("./SeriesPaneFn");
var _jsxRuntime = require("react/jsx-runtime");
/*
const DF_FROM_CHART = {
  userOptions: {
    zhConfig: {
      id: 'id'
    }
  },
  series: []
};
*/const SeriesPane = _ref => {
  let {
    refEl,
    style,
    toChart,
    fromChart
  } = _ref;
  const _refSeries = (0, _uiApi.useRef)([]),
    [_regSeriaRow, _unregSeriaRow] = (0, _uiApi.useMemo)(() => [(ref, compIndex) => {
      _refSeries.current[compIndex] = ref;
    }, compIndex => {
      _refSeries.current[compIndex] = null;
    }], []);
  (0, _uiApi.useImperativeHandle)(refEl, () => ({
    getValues: () => {
      const [userMin, userMax] = (0, _SeriesPaneFn.getUserMinMax)(fromChart);
      return (0, _uiApi.getRefValue)(_refSeries).map(refRow => (0, _uiApi.getInputValue)(refRow)).filter(config => config && config.isChecked).map(config => {
        config.userMin = userMin;
        config.userMax = userMax;
        return config;
      });
    }
  }), [fromChart]);
  const _yAxisOptions = (0, _SeriesPaneFn.crYAxisOptions)(toChart),
    {
      userOptions,
      series
    } = fromChart || {},
    {
      zhConfig
    } = userOptions || {},
    {
      id = 'id'
    } = zhConfig || {};
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ScrollPane.default, {
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PasteToTitle.default, {
      chartId: id
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PasteToSeriaList.default, {
      chartId: id,
      series: series,
      options: _yAxisOptions,
      onReg: _regSeriaRow,
      onUnReg: _unregSeriaRow
    })]
  });
};
var _default = exports.default = SeriesPane;
//# sourceMappingURL=SeriesPane.js.map