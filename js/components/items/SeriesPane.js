"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ScrollPane = _interopRequireDefault(require("../zhn/ScrollPane"));

var _SeriaRow = _interopRequireDefault(require("./SeriaRow"));

var _jsxRuntime = require("react/jsx-runtime");

const CL_ELL = 'ellipsis',
      S_ROOT_DIV = {
  paddingTop: 8
},
      S_TITLE = {
  paddingBottom: 4,
  margin: '0 0 8px 16px',
  fontWeight: 'bold',
  borderBottom: '2px solid black'
},
      S_CHART_ID = {
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

const _crYAxisOption = toChart => {
  const options = [{
    caption: 'withYAxis',
    value: void 0
  }];
  toChart.yAxis.forEach((yAxis, index) => {
    options.push({
      caption: "toYAxis" + (index + 1),
      value: index
    });
  });
  return options;
};

const PasteToTitle = ({
  chartId
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
  style: S_TITLE,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    children: "From Chart:\xA0"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: CL_ELL,
    style: S_CHART_ID,
    children: chartId
  })]
});

const PasteToSeriaList = ({
  chartId,
  series,
  options,
  onReg,
  onUnReg
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
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

class SeriesPane extends _react.Component {
  constructor(...args) {
    super(...args);
    this._refSeries = [];

    this._regSeriaRow = (ref, compIndex) => {
      this._refSeries[compIndex] = ref;
    };

    this._unregSeriaRow = compIndex => {
      this._refSeries[compIndex] = null;
    };
  }

  render() {
    const {
      style,
      toChart,
      fromChart
    } = this.props,
          _yAxisOption = _crYAxisOption(toChart),
          {
      userOptions,
      series
    } = fromChart || {},
          {
      zhConfig
    } = userOptions || {},
          {
      id: chartId = 'id'
    } = zhConfig || {};

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ScrollPane.default, {
      style: { ...style,
        ...S_ROOT_DIV
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(PasteToTitle, {
        chartId: chartId
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(PasteToSeriaList, {
        chartId: chartId,
        series: series,
        options: _yAxisOption,
        onReg: this._regSeriaRow,
        onUnReg: this._unregSeriaRow
      })]
    });
  }

  getValues() {
    const [userMin, userMax] = _getUserMinMax(this.props.fromChart);

    return this._refSeries.filter(ref => ref !== null).map(ref => ref.current.getValue()).filter(config => config.isChecked).map(config => {
      config.userMin = userMin;
      config.userMax = userMax;
      return config;
    });
  }

}

var _default = SeriesPane;
exports.default = _default;
//# sourceMappingURL=SeriesPane.js.map