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

var CL_SCROLL = 'scroll-container-y scroll-menu';
var S = {
  BROWSER: {
    paddingRight: 0
  }
};

var MenuBrowser = function MenuBrowser(_ref) {
  var caption = _ref.caption,
      store = _ref.store,
      browserType = _ref.browserType,
      isShow = _ref.isShow,
      showAction = _ref.showAction,
      updateAction = _ref.updateAction,
      children = _ref.children;

  var _useState = (0, _react.useState)(!!isShow),
      is = _useState[0],
      setIs = _useState[1],
      _useState2 = (0, _react.useState)(store.getBrowserMenu(browserType)),
      menuItems = _useState2[0],
      setMenuItems = _useState2[1],
      _hHide = (0, _react.useCallback)(function () {
    return setIs(false);
  }, []);

  (0, _useListen["default"])(store, function (actionType, data) {
    if (actionType === showAction && data === browserType) {
      setIs(true);
    } else if (actionType === updateAction && data === browserType) {
      setMenuItems(store.getBrowserMenu(browserType));
    }
  });
  return _react["default"].createElement(_Browser["default"], {
    isShow: is,
    style: S.BROWSER
  }, _react["default"].createElement(_BrowserCaption["default"], {
    caption: caption,
    onClose: _hHide
  }), _react["default"].createElement(_ScrollPane["default"], {
    className: CL_SCROLL
  }, _react["default"].createElement(_MenuParts["default"], {
    menuItems: menuItems
  }), children));
};

var _default = MenuBrowser;
exports["default"] = _default;
//# sourceMappingURL=MenuBrowser.js.map