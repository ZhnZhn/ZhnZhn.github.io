"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _seriaFns = require("../../charts/seriaFns");
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _RowInputText = _interopRequireDefault(require("../dialogs/RowInputText"));
var _RowInputColor = _interopRequireDefault(require("../dialogs/RowInputColor"));
var _jsxRuntime = require("react/jsx-runtime");
const S_TEXT = {
    padding: '16px 0 0 16px',
    fontWeight: 600
  },
  S_PL_8 = {
    paddingLeft: 8
  },
  S_CAPTION_1 = {
    width: 60
  },
  S_CAPTION_2 = {
    width: 100
  },
  S_INPUT = {
    width: 40
  };
const DF_POIN_WIDTH = 1,
  DF_R1 = 4,
  DF_R2 = 0;
const SERIA_OPTION = {
  name: 'Range',
  type: 'columnrange',
  borderWidth: 0,
  pointWidth: DF_POIN_WIDTH
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
  seria.update(options, false);
};
const _fHeValue = (ref, min, max) => v => {
  const _ = parseInt(v, 10);
  if (_ > min && _ < max) {
    (0, _uiApi.setRefValue)(ref, v);
  }
};
const _crSeriaOptions = pointWidth => ({
  ...SERIA_OPTION,
  ...{
    pointWidth
  }
});
const ColumnRangeDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    data,
    onClose
  } = _ref;
  const _refPointWidth = (0, _uiApi.useRef)(DF_POIN_WIDTH),
    _refR1 = (0, _uiApi.useRef)(DF_R1),
    _refR2 = (0, _uiApi.useRef)(DF_R2),
    _refColor = (0, _uiApi.useRef)(),
    _refFromIndex = (0, _uiApi.useRef)(),
    _refToIndex = (0, _uiApi.useRef)(),
    _refInputWidth = (0, _uiApi.useRef)(),
    _refInputR1 = (0, _uiApi.useRef)(),
    _refInputR2 = (0, _uiApi.useRef)(),
    [_heWidth, _heRadius1, _heRadius2, _heColor] = (0, _uiApi.useMemo)(() => [_fHeValue(_refPointWidth, -1, 7), _fHeValue(_refR1, -1, 9), _fHeValue(_refR2, -1, 9), color => {
      (0, _uiApi.setRefValue)(_refColor, color);
    }], []),
    _hAdd = (0, _uiApi.useMemo)(() => () => {
      const {
          chart
        } = data,
        _series = chart.series,
        _s1 = _series[(0, _uiApi.getRefValue)(_refFromIndex)],
        _s2 = _series[(0, _uiApi.getRefValue)(_refToIndex)],
        _d = (0, _seriaFns.columnRange)(_s1.data, _s2.data);
      _heWidth((0, _uiApi.getInputValue)(_refInputWidth));
      _heRadius1((0, _uiApi.getInputValue)(_refInputR1));
      _heRadius2((0, _uiApi.getInputValue)(_refInputR2));
      _setRadius((0, _uiApi.getRefValue)(_refR1), _s1);
      _setRadius((0, _uiApi.getRefValue)(_refR2), _s2);
      chart.zhAddSeriaToYAxis({
        data: _d,
        color: (0, _uiApi.getRefValue)(_refColor),
        yIndex: 0
      }, _crSeriaOptions((0, _uiApi.getRefValue)(_refPointWidth)));
      chart.zhDataLabels(true);
      onClose();
    }, [data, onClose, _heWidth, _heRadius1, _heRadius2]),
    _commandButtons = (0, _uiApi.useMemo)(() => [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      caption: "Yes, Connect",
      isPrimary: true,
      onClick: _hAdd
    }, "yes")], [_hAdd]);
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
  (0, _uiApi.setRefValue)(_refColor, c1);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog.default, {
    caption: "Add ColumnRange",
    isShow: isShow,
    commandButtons: _commandButtons,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_TEXT,
      children: "Connect dots series by column range?"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_PL_8,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputColor.default, {
        style: _styleFn.S_INLINE,
        captionStyle: S_CAPTION_1,
        caption: "Color",
        initValue: c1,
        onEnter: _heColor
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputText.default, {
        refEl: _refInputWidth,
        styleRoot: _styleFn.S_INLINE,
        styleCaption: S_CAPTION_1,
        styleInput: S_INPUT,
        caption: "Width",
        initValue: DF_POIN_WIDTH,
        maxLength: 2,
        type: "number",
        min: 0,
        max: 6,
        step: 1
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_PL_8,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputText.default, {
        refEl: _refInputR1,
        styleRoot: _styleFn.S_INLINE,
        styleCaption: {
          ...S_CAPTION_2,
          ...{
            color: c1
          }
        },
        styleInput: S_INPUT,
        caption: `R ${n1}`,
        initValue: DF_R1,
        type: "number",
        maxLength: 2
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputText.default, {
        refEl: _refInputR2,
        styleRoot: _styleFn.S_INLINE,
        styleCaption: {
          ...S_CAPTION_2,
          ...{
            color: c2
          }
        },
        styleInput: S_INPUT,
        caption: `R ${n2}`,
        initValue: DF_R2,
        type: "number",
        maxLength: 2
      })]
    })]
  });
});
var _default = exports.default = ColumnRangeDialog;
//# sourceMappingURL=ColumnRangeDialog.js.map