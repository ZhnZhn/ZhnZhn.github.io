"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _useBool = _interopRequireDefault(require("../hooks/useBool"));

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _useLoadMenu = _interopRequireDefault(require("./useLoadMenu"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _MenuTopicList = _interopRequireDefault(require("./MenuTopicList"));

var _jsxRuntime = require("react/jsx-runtime");

const {
  Browser,
  BrowserCaption,
  ScrollPane,
  SpinnerLoading
} = _Comp.default;
const CL_SCROLL = 'scroll-container-y scroll-menu',
      S_BROWSER = {
  paddingRight: 0
};

const BrowserMenu = _ref => {
  let {
    isInitShow,
    caption,
    store,
    browserType,
    showAction,
    updateAction,
    loadedAction,
    failedAction,
    onLoadMenu,
    children
  } = _ref;
  const [isShow, showBrowser, hideBrowser] = (0, _useBool.default)(isInitShow),
        [isLoading, menu, setLoaded, setFailed, updateMenu] = (0, _useLoadMenu.default)(isShow, onLoadMenu);
  (0, _useListen.default)((actionType, data) => {
    if (data === browserType) {
      if (actionType === showAction) {
        showBrowser();
      } else if (actionType === updateAction) {
        updateMenu(store.getBrowserMenu(browserType));
      } else if (actionType === failedAction) {
        setFailed();
      }
    } else if ((data == null ? void 0 : data.browserType) === browserType && actionType === loadedAction) {
      setLoaded(data.menuItems);
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Browser, {
    isShow: isShow,
    style: S_BROWSER,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(BrowserCaption, {
      caption: caption,
      onClose: hideBrowser
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(ScrollPane, {
      className: CL_SCROLL,
      children: [isLoading && /*#__PURE__*/(0, _jsxRuntime.jsx)(SpinnerLoading, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuTopicList.default, {
        menu: menu
      }), children]
    })]
  });
};

var _default = BrowserMenu;
exports.default = _default;
//# sourceMappingURL=BrowserMenu.js.map