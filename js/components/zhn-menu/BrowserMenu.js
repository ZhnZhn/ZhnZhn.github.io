"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _use = _interopRequireDefault(require("../hooks/use"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _MenuTopic = _interopRequireDefault(require("./MenuTopic"));

var useBool = _use["default"].useBool,
    useListen = _use["default"].useListen,
    Browser = _Comp["default"].Browser,
    BrowserCaption = _Comp["default"].BrowserCaption,
    ScrollPane = _Comp["default"].ScrollPane,
    SpinnerLoading = _Comp["default"].SpinnerLoading;
var S = {
  CL_SCROLL: 'scroll-container-y scroll-menu',
  BROWSER: {
    paddingRight: 0
  },
  CAPTION: {
    top: 9
  }
};

var LOADING = 'a',
    LOADED = 'b',
    FAILED = 'c',
    UPDATE = 'd',
    _crAction = function _crAction(type, menu) {
  return {
    type: type,
    menu: menu
  };
},
    initialState = {
  isLoaded: false,
  isLoading: false,
  menu: []
};

var _reducer = function _reducer(state, _ref) {
  var type = _ref.type,
      menu = _ref.menu;

  switch (type) {
    case LOADING:
      return (0, _extends2["default"])({}, state, {
        isLoading: true
      });

    case LOADED:
      return {
        isLoading: false,
        isLoaded: true,
        menu: menu
      };

    case FAILED:
      return (0, _extends2["default"])({}, initialState);

    case UPDATE:
      return (0, _extends2["default"])({}, state, {
        menu: menu
      });

    default:
      return state;
  }
};

var BrowserMenu = function BrowserMenu(_ref2) {
  var isInitShow = _ref2.isInitShow,
      caption = _ref2.caption,
      store = _ref2.store,
      browserType = _ref2.browserType,
      showAction = _ref2.showAction,
      updateAction = _ref2.updateAction,
      loadedAction = _ref2.loadedAction,
      failedAction = _ref2.failedAction,
      onLoadMenu = _ref2.onLoadMenu,
      children = _ref2.children;

  var _useBool = useBool(isInitShow),
      isShow = _useBool[0],
      showBrowser = _useBool[1],
      hideBrowser = _useBool[2],
      _useReducer = (0, _react.useReducer)(_reducer, initialState),
      _useReducer$ = _useReducer[0],
      isLoading = _useReducer$.isLoading,
      isLoaded = _useReducer$.isLoaded,
      menu = _useReducer$.menu,
      dispatch = _useReducer[1];

  useListen(store, function (actionType, data) {
    if (data === browserType) {
      if (actionType === showAction) {
        showBrowser();
      } else if (actionType === updateAction) {
        dispatch(_crAction(UPDATE, store.getBrowserMenu(browserType)));
      } else if (actionType === failedAction) {
        dispatch(_crAction(FAILED));
      }
    } else if ((data == null ? void 0 : data.browserType) === browserType && actionType === loadedAction) {
      dispatch(_crAction(LOADED, data.menuItems));
    }
  });
  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _react.useEffect)(function () {
    if (!isLoaded && isShow) {
      onLoadMenu();
      dispatch(_crAction(LOADING));
    }
  }, [isLoaded, isShow]);
  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Browser, {
    isShow: isShow,
    style: S.BROWSER,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(BrowserCaption, {
      caption: caption,
      captionStyle: S.CAPTION,
      onClose: hideBrowser
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(ScrollPane, {
      className: S.CL_SCROLL,
      children: [isLoading && /*#__PURE__*/(0, _jsxRuntime.jsx)(SpinnerLoading, {}), menu.map(function (menuTopic, index) {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuTopic["default"], (0, _extends2["default"])({}, menuTopic), index);
      }), children]
    })]
  });
};

var _default = BrowserMenu;
exports["default"] = _default;
//# sourceMappingURL=BrowserMenu.js.map