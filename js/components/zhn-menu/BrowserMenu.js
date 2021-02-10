"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _use = _interopRequireDefault(require("../hooks/use"));

var _useLoadMenu2 = _interopRequireDefault(require("./useLoadMenu"));

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
/*
const LOADING = 'a'
, LOADED = 'b'
, FAILED = 'c'
, UPDATE = 'd'
, _crAction = (type, menu) => ({ type, menu })
, initialState = {
  isLoaded: false,
  isLoading: false,
  menu: [],
};

const _reducer = (state, {type, menu}) => {
  switch(type){
    case LOADING: return { ...state, isLoading: true };
    case LOADED: return {
      isLoading: false,
      isLoaded: true,
      menu
    };
    case FAILED: return { ...initialState };
    case UPDATE: return { ...state, menu };
    default: return state;
  }
};
*/

var BrowserMenu = function BrowserMenu(_ref) {
  var isInitShow = _ref.isInitShow,
      caption = _ref.caption,
      store = _ref.store,
      browserType = _ref.browserType,
      showAction = _ref.showAction,
      updateAction = _ref.updateAction,
      loadedAction = _ref.loadedAction,
      failedAction = _ref.failedAction,
      onLoadMenu = _ref.onLoadMenu,
      children = _ref.children;

  var _useBool = useBool(isInitShow),
      isShow = _useBool[0],
      showBrowser = _useBool[1],
      hideBrowser = _useBool[2],
      _useLoadMenu = (0, _useLoadMenu2["default"])(),
      isLoading = _useLoadMenu[0],
      isLoaded = _useLoadMenu[1],
      menu = _useLoadMenu[2],
      setLoading = _useLoadMenu[3],
      setLoaded = _useLoadMenu[4],
      setFailed = _useLoadMenu[5],
      updateMenu = _useLoadMenu[6]; //, [{isLoading, isLoaded, menu}, dispatch] = useReducer(_reducer, initialState)


  useListen(store, function (actionType, data) {
    if (data === browserType) {
      if (actionType === showAction) {
        showBrowser();
      } else if (actionType === updateAction) {
        updateMenu(store.getBrowserMenu(browserType)); //dispatch(_crAction(UPDATE, store.getBrowserMenu(browserType)))
      } else if (actionType === failedAction) {
        setFailed(); //dispatch(_crAction(FAILED))
      }
    } else if ((data == null ? void 0 : data.browserType) === browserType && actionType === loadedAction) {
      setLoaded(data.menuItems); //dispatch(_crAction(LOADED, data.menuItems))
    }
  });
  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _react.useEffect)(function () {
    if (!isLoaded && isShow) {
      onLoadMenu();
      setLoading(); //dispatch(_crAction(LOADING))
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