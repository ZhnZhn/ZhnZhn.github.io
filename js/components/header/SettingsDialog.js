"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _memoIsShow = _interopRequireDefault(require("../hoc/memoIsShow"));
var _useRefFocus = _interopRequireDefault(require("../hooks/useRefFocus"));
var _useSettingsMenuMore = _interopRequireDefault(require("./useSettingsMenuMore"));
var _uiTheme = require("../styles/uiTheme");
var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));
var _TabPane = _interopRequireDefault(require("../zhn-tab/TabPane"));
var _Tab = _interopRequireDefault(require("../zhn-tab/Tab"));
var _PaneApiKey = _interopRequireDefault(require("./PaneApiKey"));
var _PaneOptions = _interopRequireDefault(require("./PaneOptions"));
var _jsxRuntime = require("react/jsx-runtime");
const S_MODAL = {
    position: 'static',
    width: 380,
    maxHeight: 446,
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
  },
  S_BT = {
    color: '#232f3b'
  };
const CL_ROW = 'row__pane-topic not-selected';
const SettingsDialog = (0, _memoIsShow.default)(_ref => {
  let {
    isShow,
    data,
    onClose
  } = _ref;
  const [refFocusLast, setRefFocusLast] = (0, _useRefFocus.default)(),
    [isShowLabels, menuModel] = (0, _useSettingsMenuMore.default)(CL_ROW),
    _style = (0, _styleFn.crStyle2)(S_MODAL, !isShowLabels && S_MODAL_SMALL);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialog.default, {
    refFocusLast: refFocusLast,
    style: _style,
    caption: "User Settings",
    menuModel: menuModel,
    isWithButton: false,
    isShow: isShow,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TabPane.default, {
      id: "sd",
      isShow: isShow,
      setRefFocusLast: setRefFocusLast,
      isShowLabels: isShowLabels,
      btStyle: S_BT,
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
          onChangeTheme: _uiTheme.setUiTheme
        })
      })]
    })
  });
});
var _default = SettingsDialog;
exports.default = _default;
//# sourceMappingURL=SettingsDialog.js.map