"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _Browser = _interopRequireDefault(require("./Browser"));

var _BrowserCaption = _interopRequireDefault(require("./BrowserCaption"));

var _ScrollPane = _interopRequireDefault(require("./ScrollPane"));

var _MenuParts = _interopRequireDefault(require("./MenuParts"));

var _MenuBrowser = _interopRequireDefault(require("./MenuBrowser.Style"));

var _crMenu = function _crMenu(menuItems, isLoaded) {
  if (isLoaded === void 0) {
    isLoaded = true;
  }

  return {
    menuItems: menuItems,
    isLoaded: isLoaded
  };
};

var MenuBrowserDynamic = function MenuBrowserDynamic(_ref) {
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
      _useState2 = (0, _react.useState)(_crMenu([], false)),
      menu = _useState2[0],
      setMenu = _useState2[1],
      menuItems = menu.menuItems,
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
  (0, _react.useEffect)(function () {
    if (!isLoaded && isShow) {
      onLoadMenu({
        browserType: browserType,
        caption: caption,
        sourceMenuUrl: sourceMenuUrl
      });
    }
  }, [isLoaded, isShow]);
  return _react["default"].createElement(_Browser["default"], {
    isShow: isShow,
    style: _MenuBrowser["default"].BROWSER
  }, _react["default"].createElement(_BrowserCaption["default"], {
    caption: caption,
    captionStyle: _MenuBrowser["default"].CAPTION,
    onClose: _hHide
  }), _react["default"].createElement(_ScrollPane["default"], {
    className: _MenuBrowser["default"].CL_SCROLL
  }, _react["default"].createElement(_MenuParts["default"], {
    menuItems: menuItems
  }), children));
};

var _default = MenuBrowserDynamic;
exports["default"] = _default;
//# sourceMappingURL=MenuBrowserDynamic.js.map