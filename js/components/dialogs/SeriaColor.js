"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _CellColor = _interopRequireDefault(require("../zhn-moleculs/CellColor"));
var _Color = require("../styles/Color");
var _BtCounter = _interopRequireDefault(require("./BtCounter"));
var _ColorList = _interopRequireDefault(require("./ColorList"));
var _jsxRuntime = require("react/jsx-runtime");
const COLORS1 = ['#8abb5d', '#f7a35c', '#795548', '#f15c80', '#f45b5b', '#d2b772', '#dda0dd', '#fffafa'];
const COLORS2 = ['#f1d600', '#008b8b', '#2f7ed8', '#673ab7', '#000000', '#607d8b', '#7092be', '#c3c3c3'];
const CL_INPUT_COLOR = 'va-b',
  S_ROOT = {
    padding: '6px 0 4px 4px'
  },
  S_ROW2 = {
    paddingTop: 4
  },
  S_ROW2_PADDING = {
    paddingLeft: 56
  },
  S_BT_COUNTER = {
    marginLeft: 14,
    marginRight: 16
  },
  S_TO_CELL = {
    margin: '0 14px'
  };
const _hasLineWidth = function (_temp) {
  let {
    value
  } = _temp === void 0 ? {} : _temp;
  return !value || value === 'SPLINE' || value === 'LINE';
};
const SeriaColor = _ref => {
  let {
    refEl,
    isLong,
    chartType
  } = _ref;
  const _refLineWidth = (0, _uiApi.useRef)(),
    [color, setColor] = (0, _uiApi.useState)(_Color.TRANSPARENT_COLOR),
    [_hClick, _hReset] = (0, _uiApi.useMemo)(() => [nextColor => {
      if (nextColor) {
        setColor(nextColor);
      }
    }, () => {
      setColor(_Color.TRANSPARENT_COLOR);
    }], []);
  (0, _uiApi.useImperativeHandle)(refEl, () => ({
    getValue: () => ({
      seriaColor: color !== _Color.TRANSPARENT_COLOR ? color : void 0,
      seriaWidth: _hasLineWidth(chartType) ? (0, _uiApi.getInputValue)(_refLineWidth) : void 0
    })
  }), [color, chartType]);
  const _isLineWidth = _hasLineWidth(chartType),
    _rowStyle = (0, _styleFn.crStyle2)(S_ROW2, !_isLineWidth && S_ROW2_PADDING);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_ROOT,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CellColor.default, {
        color: color,
        className: CL_INPUT_COLOR,
        style: S_TO_CELL,
        onClick: _hReset
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ColorList.default, {
        isLong: isLong,
        colors: COLORS1,
        onClick: _hClick
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: _rowStyle,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BtCounter.default, {
        refEl: _refLineWidth,
        isShow: _isLineWidth,
        style: S_BT_COUNTER,
        title: "Line Width"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ColorList.default, {
        isLong: isLong,
        colors: COLORS2,
        onClick: _hClick
      })]
    })]
  });
};
var _default = exports.default = SeriaColor;
//# sourceMappingURL=SeriaColor.js.map