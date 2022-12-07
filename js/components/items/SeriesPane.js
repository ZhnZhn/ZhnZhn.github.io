"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _ScrollPane = _interopRequireDefault(require("../zhn/ScrollPane"));

var _DivEllipsis = _interopRequireDefault(require("../zhn/DivEllipsis"));

var _SeriaRow = _interopRequireDefault(require("./SeriaRow"));

var _jsxRuntime = require("react/jsx-runtime");

const S_TITLE = {
  paddingBottom: 4,
  margin: '0 0 8px 16px',
  fontWeight: 'bold',
  borderBottom: '2px solid black'
},
      S_CHART_ID = {
  display: 'inline-block',
  color: '#a487d4',
  width: 200,
  verticalAlign: 'bottom'
};
/*
const DF_FROM_CHART = {
  userOptions: {
    zhConfig: {
      id: 'id'
    }
  },
  series: []
};
*/

const _getUserMinMax = fromChart => {
  const {
    xAxis
  } = fromChart || {},
        [xAxis0] = xAxis || [],
        {
    dataMin,
    dataMax,
    userMin,
    userMax
  } = xAxis0 && xAxis0.getExtremes() || {};
  return [userMin || dataMin, userMax || dataMax];
};

const _crOptionItem = (caption, value) => ({
  caption,
  value
});

const _crYAxisOption = toChart => {
  const options = (toChart.yAxis || []).map((yAxis, index) => _crOptionItem("toYAxis" + (index + 1), index));
  options.unshift(_crOptionItem('withYAxis'));
  return options;
};

const PasteToTitle = _ref => {
  let {
    chartId
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_TITLE,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: "From Chart:\xA0"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DivEllipsis.default, {
      style: S_CHART_ID,
      text: chartId
    })]
  });
};

const PasteToSeriaList = _ref2 => {
  let {
    chartId,
    series,
    options,
    onReg,
    onUnReg
  } = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: (series || []).filter(seria => seria.visible).map((seria, index) => {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SeriaRow.default, {
        seria: seria,
        compIndex: index,
        yAxisOptions: options,
        onReg: onReg,
        onUnReg: onUnReg
      }, chartId + "_" + (seria.name || '') + "_" + index);
    })
  });
};

const SeriesPane = (0, _uiApi.forwardRef)((_ref3, ref) => {
  let {
    style,
    toChart,
    fromChart
  } = _ref3;

  const _refSeries = (0, _uiApi.useRef)([]),
        _regSeriaRow = (0, _uiApi.useCallback)((ref, compIndex) => {
    _refSeries.current[compIndex] = ref;
  }, []),
        _unregSeriaRow = (0, _uiApi.useCallback)(compIndex => {
    _refSeries.current[compIndex] = null;
  }, []);

  (0, _uiApi.useImperativeHandle)(ref, () => ({
    getValues: () => {
      const [userMin, userMax] = _getUserMinMax(fromChart);

      return (0, _uiApi.getRefValue)(_refSeries).filter(refRow => refRow !== null).map(refRow => refRow.current.getValue()).filter(config => config.isChecked).map(config => {
        config.userMin = userMin;
        config.userMax = userMax;
        return config;
      });
    }
  }), [fromChart]);

  const _yAxisOption = _crYAxisOption(toChart),
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
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(PasteToTitle, {
      chartId: id
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(PasteToSeriaList, {
      chartId: id,
      series: series,
      options: _yAxisOption,
      onReg: _regSeriaRow,
      onUnReg: _unregSeriaRow
    })]
  });
});
var _default = SeriesPane;
exports.default = _default;
//# sourceMappingURL=SeriesPane.js.map