"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _useRefBool = _interopRequireDefault(require("../hooks/useRefBool"));

var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));

var _useMenuMore = _interopRequireDefault(require("../dialogs/hooks/useMenuMore"));

var _useToolbar = _interopRequireDefault(require("../dialogs/hooks/useToolbar"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

const _isNaN = Number.isNaN;
const DF_INDICATOR = 'SMA',
      DF_PERIOD = 30,
      DF_FOR_DAYS = 501,
      INDICATOR_PLACEHOLDER = "Default: " + DF_INDICATOR + " (" + DF_PERIOD + ")";

const _isValueBlank = value => (value + '').trim() === '';

const _testTicket = value => !_isValueBlank(value);

const _testInRangeOrEmpty = (min, max) => value => {
  if (_isValueBlank(value)) {
    return true;
  }

  const n = parseInt((value + '').trim(), 10);
  return !_isNaN(n) && n > min && n < max;
};

const _testPeriod = _testInRangeOrEmpty(0, 201);

const _testForDays = _testInRangeOrEmpty(250, 2500);

const _crValue = (indicator, period) => {
  switch (indicator) {
    case 'MACD':
      return 'MACD(12, 24, 9)';

    case 'STOCH':
      return 'STOCH(5, 3, 3, SMA)';

    default:
      return indicator + " (" + period + ")";
  }
};

const _getInputValue = (ref, dfValue) => (0, _uiApi.isInputValid)(ref) ? (0, _uiApi.getInputValue)(ref) || dfValue : dfValue;

const AlphaIndicatorDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    caption,
    oneURI,
    oneJsonProp,
    oneCaption,
    toTopLayer,
    onAbout,
    loadId,
    onLoad,
    onShow,
    onClose
  } = _ref;

  const [isToolbar, menuMoreModel] = (0, _useMenuMore.default)(onAbout),
        [isShowOptions, toggleOptions] = (0, _useToggle.default)(),
        [isShowLabels, toggleLabels] = (0, _useToggle.default)(true),
        _toolbarButtons = (0, _useToolbar.default)({
    toggleLabels,
    toggleOptions,
    onAbout
  }),
        _refTicket = (0, _uiApi.useRef)(),
        _refPeriod = (0, _uiApi.useRef)(),
        _refForDays = (0, _uiApi.useRef)(),
        [_refIsSecondYAxis, _hCheckSecondYAxis, _hUnCheckSecondYAxis] = (0, _useRefBool.default)(false),
        [setIndicator, getIndicator] = (0, _useProperty.default)()
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hLoad = (0, _uiApi.useCallback)(() => {
    const period = _getInputValue(_refPeriod, DF_PERIOD),
          forDays = _getInputValue(_refForDays, DF_FOR_DAYS),
          ticket = _getInputValue(_refTicket),
          indicator = (getIndicator() || {}).value || DF_INDICATOR;

    onLoad({
      loadId,
      indicator,
      ticket,
      period,
      forDays,
      value: _crValue(indicator, period),
      //for label
      hasSecondYAxis: (0, _uiApi.getRefValue)(_refIsSecondYAxis)
    });
  }, []); // loadId, onLoad, getIndicator, getIsSecondYAxis

  /*eslint-enable react-hooks/exhaustive-deps */


  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.DraggableDialog, {
    isShow: isShow,
    caption: caption,
    menuModel: menuMoreModel,
    toTopLayer: toTopLayer,
    onLoad: _hLoad,
    onShow: onShow,
    onClose: onClose,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Toolbar, {
      isShow: isToolbar,
      buttons: _toolbarButtons
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowPattern, {
      ref: _refTicket,
      isShowLabels: isShowLabels,
      caption: "Stock",
      placeholder: "Nyse or Nasdaq Symbol",
      onTest: _testTicket,
      errorMsg: "Not Empty"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.SelectWithLoad, {
      isShow: isShow,
      isShowLabels: isShowLabels,
      uri: oneURI,
      jsonProp: oneJsonProp,
      caption: oneCaption,
      optionNames: "Items",
      placeholder: INDICATOR_PLACEHOLDER,
      onSelect: setIndicator
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_DialogCell.default.ShowHide, {
      isShow: isShowOptions,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowPattern, {
        ref: _refPeriod,
        isShowLabels: isShowLabels,
        caption: "Period",
        placeholder: "Default: " + DF_PERIOD,
        onTest: _testPeriod,
        errorMsg: "Number in range 1-200"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowPattern, {
        ref: _refForDays,
        isShowLabels: isShowLabels,
        caption: "For Days",
        placeholder: "Default: " + DF_FOR_DAYS + " (2 Years)",
        onTest: _testForDays,
        errorMsg: "Number in range 250-2500"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowCheckBox, {
      initValue: false,
      caption: "Add Seria with Second YAxis",
      onCheck: _hCheckSecondYAxis,
      onUnCheck: _hUnCheckSecondYAxis
    })]
  });
});
var _default = AlphaIndicatorDialog;
exports.default = _default;
//# sourceMappingURL=AlphaIndicatorDialog.js.map