"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useInputData = _interopRequireDefault(require("./useInputData"));
var _useThemeSelect = _interopRequireDefault(require("../hooks/useThemeSelect"));
var _RowPattern = _interopRequireDefault(require("../dialogs/rows/RowPattern"));
var _RowInputSelect = _interopRequireDefault(require("../dialogs/rows/RowInputSelect"));
var _OptionCheckBoxStack = _interopRequireDefault(require("./OptionCheckBoxStack"));
var _RowButtons = _interopRequireDefault(require("./RowButtons"));
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _jsxRuntime = require("react/jsx-runtime");
const S_MR_4 = {
    marginRight: 4
  },
  S_MR_12 = {
    marginRight: 12
  },
  WITHOUT_LABELS_WIDTH = 275;
const UI_THEME_OPTIONS = [{
  caption: 'Dark',
  value: 'GREY'
}, {
  caption: 'Light',
  value: 'WHITE'
}, {
  caption: 'Sand',
  value: 'SAND'
}, {
  caption: 'Sand Light',
  value: 'SAND_L'
}];
const CHECKBOX_CONFIGS = [['View in Admin Mode', 'isAdminMode'], ['Draw Deltas to Min-Max', 'isDrawDeltaExtrems'], ['Not Zoom to Min-Max', 'isNotZoomToMinMax']];
const _crInputStyles = isShowLabels => isShowLabels ? [] : [WITHOUT_LABELS_WIDTH, {
  width: WITHOUT_LABELS_WIDTH
}];
const PaneOptions = _ref => {
  let {
    isShowLabels,
    titleStyle,
    btStyle,
    data,
    onClose,
    onChangeTheme
  } = _ref;
  const [_refProxy, _proxy, _hSetProxy, _hClearProxy] = (0, _useInputData.default)(data, 'setProxy'),
    _hSelectTheme = (0, _useThemeSelect.default)(onChangeTheme),
    [_width, _rowPatterStyle] = _crInputStyles(isShowLabels);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowPattern.default, {
      ref: _refProxy,
      isShowLabels: isShowLabels,
      style: _rowPatterStyle,
      captionStyle: titleStyle,
      caption: "Proxy",
      placeholder: "Local Http Proxy Server",
      initValue: _proxy,
      onEnter: _hSetProxy,
      isClearBlank: true,
      onClear: _hClearProxy,
      errorMsg: "Should start with http://127.0.0.1"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect.default, {
      isShowLabels: isShowLabels,
      width: _width,
      caption: "UI Theme",
      captionStyle: titleStyle,
      options: UI_THEME_OPTIONS,
      onSelect: _hSelectTheme
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_OptionCheckBoxStack.default, {
      data: data,
      configs: CHECKBOX_CONFIGS
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowButtons.default, {
      style: S_MR_12,
      btStyle: btStyle,
      onClose: onClose,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
        style: {
          ...btStyle,
          ...S_MR_4
        },
        caption: "SET PROXY",
        onClick: _hSetProxy
      })
    })]
  });
};
var _default = PaneOptions;
exports.default = _default;
//# sourceMappingURL=PaneOptions.js.map