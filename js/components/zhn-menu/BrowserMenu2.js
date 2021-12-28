"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _use = _interopRequireDefault(require("../hooks/use"));

var _useLoadMenu2 = _interopRequireDefault(require("./useLoadMenu"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _ToolbarButtonCircle = _interopRequireDefault(require("../dialogs/ToolbarButtonCircle"));

var _WrapperInputSearch = _interopRequireDefault(require("../zhn-select/WrapperInputSearch"));

var _MenuItems = _interopRequireDefault(require("./MenuItems2"));

var _jsxRuntime = require("react/jsx-runtime");

var useBool = _use.default.useBool,
    useToggle = _use.default.useToggle,
    useListen = _use.default.useListen,
    Browser = _Comp.default.Browser,
    BrowserCaption = _Comp.default.BrowserCaption,
    ShowHide = _Comp.default.ShowHide,
    ScrollPane = _Comp.default.ScrollPane,
    SpinnerLoading = _Comp.default.SpinnerLoading;
var SEARCH_PLACEHOLDER = "Search By Symbol Or Name";
var CL_BROWSER = "scroll-browser-by",
    CL_BROWSER_WITH_SEARCH = "scroll-browser-by--search",
    CL_ROW_ITEM = 'row__type2-topic not-selected',
    S_BROWSER = {
  paddingRight: 0,
  paddingBottom: 4,
  minWidth: 300
},
    S_WRAPPER_SEARCH = {
  width: '100%',
  paddingBottom: 8,
  paddingRight: 24
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

var BrowserMenu2 = function BrowserMenu2(_ref) {
  var isInitShow = _ref.isInitShow,
      store = _ref.store,
      browserType = _ref.browserType,
      showAction = _ref.showAction,
      loadedAction = _ref.loadedAction,
      failedAction = _ref.failedAction,
      caption = _ref.caption,
      onLoadMenu = _ref.onLoadMenu,
      descrUrl = _ref.descrUrl,
      onClickInfo = _ref.onClickInfo,
      onShowLoadDialog = _ref.onShowLoadDialog,
      ItemOptionComp = _ref.ItemOptionComp,
      ItemComp = _ref.ItemComp,
      children = _ref.children;

  var _useBool = useBool(isInitShow),
      isShow = _useBool[0],
      showBrowser = _useBool[1],
      hideBrowser = _useBool[2],
      _useToggle = useToggle(),
      isShowSearch = _useToggle[0],
      toggleSearch = _useToggle[1],
      _toolbarButtons = _useToolbarButtons(toggleSearch, onClickInfo, descrUrl),
      _useLoadMenu = (0, _useLoadMenu2.default)(),
      isLoading = _useLoadMenu[0],
      isLoaded = _useLoadMenu[1],
      menu = _useLoadMenu[2],
      setLoading = _useLoadMenu[3],
      setLoaded = _useLoadMenu[4],
      setFailed = _useLoadMenu[5];

  useListen(store, function (actionType, data) {
    if (data === browserType) {
      if (actionType === showAction) {
        showBrowser();
      } else if (actionType === failedAction) {
        setFailed();
      }
    } else if (actionType === loadedAction && data.browserType === browserType) {
      setLoaded(data.menuItems);
    }
  });
  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _react.useEffect)(function () {
    if (!isLoaded && isShow) {
      onLoadMenu();
      setLoading();
    }
  }, [isLoaded, isShow]);
  /*eslint-enable react-hooks/exhaustive-deps */

  var _scrollClass = isShowSearch ? CL_BROWSER_WITH_SEARCH : CL_BROWSER;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Browser, {
    isShow: isShow,
    style: S_BROWSER,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(BrowserCaption, {
      caption: caption,
      onClose: hideBrowser
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButtonCircle.default, {
      buttons: _toolbarButtons
    }), !isLoading && /*#__PURE__*/(0, _jsxRuntime.jsx)(ShowHide, {
      isShow: isShowSearch,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_WrapperInputSearch.default, {
        style: S_WRAPPER_SEARCH,
        placeholder: SEARCH_PLACEHOLDER,
        data: menu,
        ItemOptionComp: ItemOptionComp,
        onSelect: onShowLoadDialog
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(ScrollPane, {
      className: _scrollClass,
      children: [isLoading && /*#__PURE__*/(0, _jsxRuntime.jsx)(SpinnerLoading, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItems.default, {
        model: menu,
        ItemComp: ItemComp,
        itemClassName: CL_ROW_ITEM,
        onClickItem: onShowLoadDialog
      }), children]
    })]
  });
};

var _default = BrowserMenu2;
exports.default = _default;
//# sourceMappingURL=BrowserMenu2.js.map