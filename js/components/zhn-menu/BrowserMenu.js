"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _use = _interopRequireDefault(require("../hooks/use"));

var _useLoadMenu = _interopRequireDefault(require("./useLoadMenu"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _MenuTopic = _interopRequireDefault(require("./MenuTopic"));

var _jsxRuntime = require("react/jsx-runtime");

const {
  useBool,
  useListen
} = _use.default,
      {
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
  const [isShow, showBrowser, hideBrowser] = useBool(isInitShow),
        [isLoading, isLoaded, menu, setLoading, setLoaded, setFailed, updateMenu] = (0, _useLoadMenu.default)();
  useListen((actionType, data) => {
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
  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _react.useEffect)(() => {
    if (!isLoaded && isShow) {
      onLoadMenu();
      setLoading();
    }
  }, [isLoaded, isShow]);
  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Browser, {
    isShow: isShow,
    style: S_BROWSER,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(BrowserCaption, {
      caption: caption,
      onClose: hideBrowser
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(ScrollPane, {
      className: CL_SCROLL,
      children: [isLoading && /*#__PURE__*/(0, _jsxRuntime.jsx)(SpinnerLoading, {}), menu.map((menuTopic, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuTopic.default, { ...menuTopic
      }, index)), children]
    })]
  });
};

var _default = BrowserMenu;
exports.default = _default;
//# sourceMappingURL=BrowserMenu.js.map