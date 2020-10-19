"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _MenuTopic = _interopRequireDefault(require("./MenuTopic"));

var S = {
  CL_SCROLL: 'scroll-container-y scroll-menu',
  BROWSER: {
    paddingRight: 0
  },
  CAPTION: {
    top: 9
  }
};
var Browser = _Comp["default"].Browser,
    BrowserCaption = _Comp["default"].BrowserCaption,
    ScrollPane = _Comp["default"].ScrollPane;

var _crMenu = function _crMenu(arrMenu, isLoaded) {
  if (arrMenu === void 0) {
    arrMenu = [];
  }

  if (isLoaded === void 0) {
    isLoaded = true;
  }

  return {
    arrMenu: arrMenu,
    isLoaded: isLoaded
  };
};

var BrowserMenu = function BrowserMenu(_ref) {
  var isInitShow = _ref.isInitShow,
      caption = _ref.caption,
      store = _ref.store,
      browserType = _ref.browserType,
      showAction = _ref.showAction,
      updateAction = _ref.updateAction,
      loadCompletedAction = _ref.loadCompletedAction,
      sourceMenuUrl = _ref.sourceMenuUrl,
      onLoadMenu = _ref.onLoadMenu,
      children = _ref.children;

  var _useState = (0, _react.useState)(!!isInitShow),
      isShow = _useState[0],
      setIsShow = _useState[1],
      _useState2 = (0, _react.useState)(function () {
    return _crMenu([], false);
  }),
      menu = _useState2[0],
      setMenu = _useState2[1],
      arrMenu = menu.arrMenu,
      isLoaded = menu.isLoaded,
      _hHide = (0, _react.useCallback)(function () {
    return setIsShow(false);
  }, []);

  (0, _useListen["default"])(store, function (actionType, data) {
    if (data === browserType) {
      if (actionType === showAction) {
        setIsShow(true);
      } else if (actionType === updateAction) {
        setMenu(_crMenu(store.getBrowserMenu(browserType)));
      }
    } else if ((data == null ? void 0 : data.browserType) === browserType && actionType === loadCompletedAction) {
      setMenu(_crMenu(data.menuItems));
    }
  });
  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _react.useEffect)(function () {
    if (!isLoaded && isShow) {
      onLoadMenu({
        browserType: browserType,
        caption: caption,
        sourceMenuUrl: sourceMenuUrl
      });
    }
  }, [isLoaded, isShow]);
  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Browser, {
    isShow: isShow,
    style: S.BROWSER,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(BrowserCaption, {
      caption: caption,
      captionStyle: S.CAPTION,
      onClose: _hHide
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(ScrollPane, {
      className: S.CL_SCROLL,
      children: [arrMenu.map(function (menuTopic, index) {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuTopic["default"], (0, _extends2["default"])({}, menuTopic), index);
      }), children]
    })]
  });
};

var _default = BrowserMenu;
exports["default"] = _default;
//# sourceMappingURL=BrowserMenu.js.map