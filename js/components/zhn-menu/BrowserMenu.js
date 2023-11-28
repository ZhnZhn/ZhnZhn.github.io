"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _useBrowserShow = _interopRequireDefault(require("../hooks/useBrowserShow"));
var _useListen = _interopRequireDefault(require("../hooks/useListen"));
var _useLoadMenu = _interopRequireDefault(require("./useLoadMenu"));
var _useBrowserMenu = _interopRequireDefault(require("./useBrowserMenu"));
var _Comp = _interopRequireDefault(require("../Comp"));
var _MenuTopicList = _interopRequireDefault(require("./MenuTopicList"));
var _jsxRuntime = require("react/jsx-runtime");
const {
  Browser,
  BrowserCaption,
  ScrollPane,
  SpinnerLoading
} = _Comp.default;
const CL_SCROLL_MENU = (0, _styleFn.crScrollYCn)('scroll-menu'),
  S_BROWSER = {
    paddingRight: 0
  };
const BrowserMenu = props => {
  const {
      caption,
      store,
      browserType,
      updateAction,
      useMsBrowserLoad,
      onLoadMenu,
      children
    } = props,
    [isShow, hideBrowser] = (0, _useBrowserShow.default)(props),
    [isLoading, menu, updateMenu] = (0, _useLoadMenu.default)(isShow, onLoadMenu, useMsBrowserLoad, browserType),
    refFirstItem = (0, _useBrowserMenu.default)(isShow, menu);
  (0, _useListen.default)((actionType, data) => {
    if (data === browserType && actionType === updateAction) {
      updateMenu(store.getBrowserMenu(browserType));
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Browser, {
    isShow: isShow,
    style: S_BROWSER,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(BrowserCaption, {
      caption: caption,
      onClose: hideBrowser
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(ScrollPane, {
      className: CL_SCROLL_MENU,
      children: [isLoading && /*#__PURE__*/(0, _jsxRuntime.jsx)(SpinnerLoading, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuTopicList.default, {
        menu: menu,
        refFirstItem: refFirstItem
      }), children]
    })]
  });
};
var _default = exports.default = BrowserMenu;
//# sourceMappingURL=BrowserMenu.js.map