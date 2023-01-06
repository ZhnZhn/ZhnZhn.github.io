"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _ThemeContext = _interopRequireDefault(require("../hoc/ThemeContext"));
var _getFnByPropName = _interopRequireDefault(require("../../utils/getFnByPropName"));
var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _RowButtons = _interopRequireDefault(require("./RowButtons"));
var _OptionCheckBoxStack = _interopRequireDefault(require("./OptionCheckBoxStack"));
var _jsxRuntime = require("react/jsx-runtime");
const S_MR_4 = {
    marginRight: 4
  },
  S_MR_12 = {
    marginRight: 12
  };
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
const SET_PROXY = 'setProxy';
const MODE_ADMIN = 'isAdminMode';
const MODE_DELTA = 'isDrawDeltaExtrems';
const MODE_ZOOM = 'isNotZoomToMinMax';
const _useProxy = data => {
  const _refProxy = (0, _uiApi.useRef)(),
    _setProxy = (0, _getFnByPropName.default)(data, SET_PROXY),
    _proxy = data.getProxy();
  return [_refProxy, _proxy, _setProxy, () => {
    const input = _refProxy.current;
    if (!_setProxy(input.getValue())) {
      input.showErrMsg();
    }
  }, () => _setProxy('')];
};
const _useTheme = onChangeTheme => {
  const theme = (0, _uiApi.useContext)(_ThemeContext.default);
  return item => {
    const _themeName = (item || {}).value;
    if (_themeName && theme.getThemeName() !== _themeName) {
      theme.setThemeName(_themeName);
      onChangeTheme(_themeName);
    }
  };
};
const CHECKBOX_CONFIGS = [["View in Admin Mode", MODE_ADMIN], ["Draw Deltas to Min-Max", MODE_DELTA], ["Not Zoom to Min-Max", MODE_ZOOM]];
const PaneOptions = _ref => {
  let {
    isShowLabels,
    titleStyle,
    btStyle,
    data,
    onClose,
    onChangeTheme
  } = _ref;
  const [_refProxy, _proxy, _setProxy, _hSetProxy, _hClearProxy] = _useProxy(data),
    _hSelectTheme = _useTheme(onChangeTheme);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowPattern, {
      ref: _refProxy,
      isShowLabels: isShowLabels,
      captionStyle: titleStyle,
      caption: "Proxy",
      placeholder: "Local Http Proxy Server",
      initValue: _proxy,
      onEnter: _setProxy,
      isClearBlank: true,
      onClear: _hClearProxy,
      errorMsg: "Should start with http://127.0.0.1"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
      isShowLabels: isShowLabels,
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