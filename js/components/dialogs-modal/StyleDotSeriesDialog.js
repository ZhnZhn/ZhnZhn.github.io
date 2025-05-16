"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _uiApi = require("../uiApi");
var _inputFn = require("../inputFn");
var _styleFn = require("../styleFn");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _useCommandButtons = _interopRequireDefault(require("../zhn-moleculs/useCommandButtons"));
var _RowCheckBox = _interopRequireDefault(require("../dialogs/rows/RowCheckBox1"));
var _RowInputText = _interopRequireDefault(require("../dialogs/RowInputText"));
var _jsxRuntime = require("react/jsx-runtime");
const S_ROW = {
    paddingLeft: 8,
    paddingBottom: 8
  },
  S_CAPTION = {
    width: 100
  },
  S_INPUT = {
    width: 40
  };

// [n1,n2,fromIndex,toIndex]
const _getNames = s => {
  const n1 = s[0].name,
    n2 = s[1].name;
  return n1 <= n2 ? [n1, n2, 0, 1] : [n2, n1, 1, 0];
};
const _getColor = (series, index) => series[index].color;
const _setRadius = (value, seria) => {
  const {
    options
  } = seria;
  options.marker.radius = value;
  seria.update(options, !1);
};
const _getInputValue = (refInput, min, max, dfValue) => {
  const value = (0, _isTypeFn.parseIntBy10)((0, _uiApi.getInputValue)(refInput));
  return value >= min && value <= max ? value : dfValue;
};
const DF_R1 = 8,
  DF_R2 = 5,
  MIN_R = 1,
  MAX_R = 15;
const RowInputRadius = _ref => {
  let {
    refEl,
    color,
    caption,
    initValue
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputText.default, {
    ...(0, _inputFn.crInputNumberProps)(initValue, MIN_R, MAX_R),
    refEl: refEl,
    styleRoot: _styleFn.S_INLINE,
    styleCaption: {
      ...S_CAPTION,
      ...{
        color
      }
    },
    styleInput: S_INPUT,
    caption: caption
  });
};
const StyleDotSeriesDialog = (0, _memoIsShow.default)(_ref2 => {
  let {
    isShow,
    data,
    onClose
  } = _ref2;
  const _refFromIndex = (0, _uiApi.useRef)(),
    _refToIndex = (0, _uiApi.useRef)(),
    _refInputR1 = (0, _uiApi.useRef)(),
    _refInputR2 = (0, _uiApi.useRef)(),
    _refIsLabels = (0, _uiApi.useRef)(!1),
    [_hEnableLabels, _hDisableLabels] = (0, _uiApi.useMemo)(() => [() => {
      (0, _uiApi.setRefValue)(_refIsLabels, !0);
    }, () => {
      (0, _uiApi.setRefValue)(_refIsLabels, !1);
    }], []),
    _hApply = (0, _uiApi.useMemo)(() => () => {
      const {
          chart
        } = data,
        _series = chart.series,
        _s1 = _series[(0, _uiApi.getRefValue)(_refFromIndex)],
        _s2 = _series[(0, _uiApi.getRefValue)(_refToIndex)],
        _r1 = _getInputValue(_refInputR1, MIN_R, MAX_R, DF_R1),
        _r2 = _getInputValue(_refInputR2, MIN_R, MAX_R, DF_R2);
      _setRadius(_r1, _s1);
      _setRadius(_r2, _s2);
      chart.zhDataLabels((0, _uiApi.getRefValue)(_refIsLabels));
      onClose();
    }, [data, onClose]),
    _commandButtons = (0, _useCommandButtons.default)(() => [["Apply", _hApply]]);
  const {
      chart
    } = data,
    {
      series
    } = chart,
    [n1, n2, fromIndex, toIndex] = _getNames(series),
    c1 = _getColor(series, fromIndex),
    c2 = _getColor(series, toIndex);
  (0, _uiApi.setRefValue)(_refFromIndex, fromIndex);
  (0, _uiApi.setRefValue)(_refToIndex, toIndex);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog.default, {
    caption: "Style Dot Series",
    isShow: isShow,
    commandButtons: _commandButtons,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_ROW,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
        caption: "Enable Labels",
        onCheck: _hEnableLabels,
        onUnCheck: _hDisableLabels
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_ROW,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(RowInputRadius, {
        refEl: _refInputR1,
        color: c1,
        caption: `R ${n1}`,
        initValue: DF_R1
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(RowInputRadius, {
        refEl: _refInputR2,
        color: c2,
        caption: `R ${n2}`,
        initValue: DF_R2
      })]
    })]
  });
});
var _default = exports.default = StyleDotSeriesDialog;
//# sourceMappingURL=StyleDotSeriesDialog.js.map