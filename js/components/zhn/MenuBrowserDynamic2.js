"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _use = _interopRequireDefault(require("../hooks/use"));

var _Browser = _interopRequireDefault(require("./Browser"));

var _BrowserCaption = _interopRequireDefault(require("./BrowserCaption"));

var _ToolbarButtonCircle = _interopRequireDefault(require("../dialogs/ToolbarButtonCircle"));

var _ShowHide = _interopRequireDefault(require("./ShowHide"));

var _WrapperInputSearch = _interopRequireDefault(require("../zhn-select/WrapperInputSearch"));

var _ScrollPane = _interopRequireDefault(require("./ScrollPane"));

var _SpinnerLoading = _interopRequireDefault(require("./SpinnerLoading"));

var _MenuListType = _interopRequireDefault(require("./MenuListType2"));

var useBool = _use["default"].useBool,
    useToggle = _use["default"].useToggle,
    useListen = _use["default"].useListen;
var SEARCH_PLACEHOLDER = "Search By Symbol Or Name";
var CL = {
  BROWSER: "scroll-browser-by",
  BROWSER_WITH_SEARCH: "scroll-browser-by--search",
  ROW_ITEM: 'row__type2-topic not-selected'
};
var STYLE = {
  BROWSER: {
    paddingRight: 0,
    paddingBottom: 4,
    minWidth: 300
  },
  CAPTION: {
    top: 9
  },
  WRAPPER_SEARCH: {
    width: '100%',
    paddingBottom: 8,
    paddingRight: 24
  }
};

var _useToolbarButtons = function _useToolbarButtons(toggleSearch, onClickInfo, descrUrl) {
  /*eslint-disable react-hooks/exhaustive-deps */
  var _hClickInfo = (0, _react.useCallback)(function () {
    onClickInfo({
      descrUrl: descrUrl
    });
  }, []);

  return (0, _react.useMemo)(function () {
    return [{
      caption: 'S',
      title: 'Click to toggle input search',
      onClick: toggleSearch
    }, {
      caption: 'A',
      title: 'About Datasources',
      onClick: _hClickInfo
    }];
  }, [_hClickInfo]);
  /*eslint-enable react-hooks/exhaustive-deps */
};

var LOADING = 'a',
    LOADED = 'b',
    FAILED = 'd',
    initialState = {
  isLoading: false,
  isLoaded: false,
  menu: []
},
    _crAction = function _crAction(type, menu) {
  return {
    type: type,
    menu: menu
  };
},
    _reducer = function _reducer(state, _ref) {
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

    default:
      return state;
  }
};

var MenuBrowserDynamic2 = function MenuBrowserDynamic2(_ref2) {
  var isInitShow = _ref2.isInitShow,
      store = _ref2.store,
      browserType = _ref2.browserType,
      showAction = _ref2.showAction,
      loadedAction = _ref2.loadedAction,
      failedAction = _ref2.failedAction,
      caption = _ref2.caption,
      onLoadMenu = _ref2.onLoadMenu,
      descrUrl = _ref2.descrUrl,
      onClickInfo = _ref2.onClickInfo,
      onShowLoadDialog = _ref2.onShowLoadDialog,
      ItemOptionComp = _ref2.ItemOptionComp,
      ItemComp = _ref2.ItemComp,
      children = _ref2.children;

  var _useBool = useBool(isInitShow),
      isShow = _useBool[0],
      showBrowser = _useBool[1],
      hideBrowser = _useBool[2],
      _useToggle = useToggle(),
      isShowSearch = _useToggle[0],
      toggleSearch = _useToggle[1],
      _toolbarButtons = _useToolbarButtons(toggleSearch, onClickInfo, descrUrl),
      _useReducer = (0, _react.useReducer)(_reducer, initialState),
      _useReducer$ = _useReducer[0],
      isLoading = _useReducer$.isLoading,
      isLoaded = _useReducer$.isLoaded,
      menu = _useReducer$.menu,
      dispath = _useReducer[1];

  useListen(store, function (actionType, data) {
    if (data === browserType) {
      if (actionType === showAction) {
        showBrowser();
      } else if (actionType === failedAction) {
        dispath(_crAction(FAILED));
      }
    } else if (actionType === loadedAction && data.browserType === browserType) {
      dispath(_crAction(LOADED, data.menuItems));
    }
  });
  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _react.useEffect)(function () {
    if (!isLoaded && isShow) {
      onLoadMenu();
      dispath(_crAction(LOADING));
    }
  }, [isLoaded, isShow]);
  /*eslint-enable react-hooks/exhaustive-deps */

  var _scrollClass = isShowSearch ? CL.BROWSER_WITH_SEARCH : CL.BROWSER;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Browser["default"], {
    isShow: isShow,
    style: STYLE.BROWSER,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BrowserCaption["default"], {
      caption: caption,
      captionStyle: STYLE.CAPTION,
      onClose: hideBrowser
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButtonCircle["default"], {
      buttons: _toolbarButtons
    }), !isLoading && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide["default"], {
      isShow: isShowSearch,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_WrapperInputSearch["default"], {
        style: STYLE.WRAPPER_SEARCH,
        placeholder: SEARCH_PLACEHOLDER,
        data: menu,
        ItemOptionComp: ItemOptionComp,
        onSelect: onShowLoadDialog
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ScrollPane["default"], {
      className: _scrollClass,
      children: [isLoading && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpinnerLoading["default"], {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuListType["default"], {
        model: menu,
        ItemComp: ItemComp,
        itemClassName: CL.ROW_ITEM,
        onClickItem: onShowLoadDialog
      }), children]
    })]
  });
};

var _default = MenuBrowserDynamic2;
exports["default"] = _default;
//# sourceMappingURL=MenuBrowserDynamic2.js.map