"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _settingStore = require("../../flux/stores/settingStore");
var _useInputData = _interopRequireDefault(require("./useInputData"));
var _RowPattern = _interopRequireDefault(require("../dialogs/rows/RowPattern"));
var _RowInputSelect = _interopRequireDefault(require("../dialogs/rows/RowInputSelect"));
var _OptionInputSwitchStack = _interopRequireDefault(require("./OptionInputSwitchStack"));
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
const _crInputStyles = isShowLabels => isShowLabels ? [] : [WITHOUT_LABELS_WIDTH, {
  width: WITHOUT_LABELS_WIDTH
}];
const PaneOptions = _ref => {
  let {
    isVisible,
    isShowLabels,
    titleStyle,
    btStyle,
    data,
    uiThemeOptions,
    onClose,
    setRefFocusLast,
    onChangeTheme
  } = _ref;
  const [_refProxy, _proxy, _hSetProxy, _hClearProxy] = (0, _useInputData.default)(data, 'setProxy'),
    [_width, _rowPatterStyle] = _crInputStyles(isShowLabels);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowPattern.default, {
      refEl: _refProxy,
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
      propCaption: "c",
      options: uiThemeOptions,
      onSelect: onChangeTheme
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_OptionInputSwitchStack.default, {
      data: data,
      configs: _settingStore.CHECKBOX_CONFIGS
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowButtons.default, {
      style: S_MR_12,
      btStyle: btStyle,
      onClose: onClose,
      setRefFocusLast: isVisible ? setRefFocusLast : void 0,
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
var _default = exports.default = PaneOptions;
//# sourceMappingURL=PaneOptions.js.map