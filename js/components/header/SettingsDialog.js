"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useFocus = require("../hooks/useFocus");
var _useRerender = _interopRequireDefault(require("../hooks/useRerender"));
var _useSettingsMenuMore = _interopRequireDefault(require("./useSettingsMenuMore"));
var _uiTheme = require("../styles/uiTheme");
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _TabPane = _interopRequireDefault(require("../zhn-tab/TabPane"));
var _Tab = _interopRequireDefault(require("../zhn-tab/Tab"));
var _PaneApiKey = _interopRequireDefault(require("./PaneApiKey"));
var _PaneOptions = _interopRequireDefault(require("./PaneOptions"));
var _jsxRuntime = require("react/jsx-runtime");
const TOKEN_USER_SETTINGS = "User Settings",
  S_MODAL = {
    position: 'static',
    width: 366,
    maxHeight: 420,
    margin: '70px auto 0px'
  },
  S_MODAL_SMALL = {
    width: 295
  },
  S_TITLE_API = {
    width: 82
  },
  S_TITLE_OPTION = {
    width: 100
  };
const SettingsDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    data,
    onClose
  } = _ref;
  const [refFocusLast, setRefFocusLast] = (0, _useFocus.useRefFocusElement)(),
    rerender = (0, _useRerender.default)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    _setUiTheme = (0, _uiApi.useCallback)(item => {
      (0, _uiTheme.setUiTheme)(item);
      rerender();
    }, [])
    // rerender
    /*eslint-enable react-hooks/exhaustive-deps */,
    [isShowLabels, menuModel] = (0, _useSettingsMenuMore.default)(_styleFn.CL_ROW_PANE_TOPIC),
    _style = (0, _styleFn.crStyle2)(S_MODAL, !isShowLabels && S_MODAL_SMALL);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog.default, {
    refFocusLast: refFocusLast,
    style: _style,
    caption: TOKEN_USER_SETTINGS,
    menuModel: menuModel,
    isWithButton: false,
    isShow: isShow,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TabPane.default, {
      ariaLabel: TOKEN_USER_SETTINGS,
      id: "sd",
      isShow: isShow,
      setRefFocusLast: setRefFocusLast,
      isShowLabels: isShowLabels,
      data: data,
      onClose: onClose,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "ApiKeys",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PaneApiKey.default, {
          titleStyle: S_TITLE_API
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "Options",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PaneOptions.default, {
          titleStyle: S_TITLE_OPTION,
          uiThemeOptions: _uiTheme.UI_THEME_OPTIONS,
          onChangeTheme: _setUiTheme
        })
      })]
    })
  });
});
var _default = exports.default = SettingsDialog;
//# sourceMappingURL=SettingsDialog.js.map